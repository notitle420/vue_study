<template>
  <div class="ArtForm">
    <loading
      :active.sync="isLoading"
      :can-cancel="true"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    ></loading>

    <div class="header">
      <button @click.prevent="doAjax">fetch Data</button>
    </div>

    <div class="mainArea">
      <div class="imageArea">
        <img :src="imageData" />
        <b-button variant="outline-secondary" class="mt-2" v-on:click="openModal">画像を変更</b-button>
      </div>

      <div class="formArea">
        <div class="titleArea">
          <p class="description">Title</p>
          <b-form-input v-model="title" placeholder="Input Title in Here"></b-form-input>
        </div>
        <div class="descriptionArea">
          <p class="description">Description</p>
          <b-form-textarea
            id="textarea"
            v-model="description"
            placeholder="Input Description in Here"
            rows="1"
            max-rows="10"
          ></b-form-textarea>
        </div>
      </div>
    </div>

    <div class="addArtButton">
      <b-button variant="outline-secondary" @click="addArt()">Add Art</b-button>
    </div>

    <div id="overlay" v-show="showContent">
      <div id="content">
        <ImageUp />
        <button v-on:click="closeModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebase/firebase";
import ImageUp from "@/components/ImageUp";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

const storage = firebase.storage();
export const storageProfilePhotoRef = storage.ref("profilePhoto");

export default {
  components: { ImageUp, Loading },
  name: "AddArt",
  data() {
    return {
      title: "",
      description: "",
      showContent: false,
      imageData: require("@/static/defaultArtImage.png"),
      croppaData: {},
      isLoading: false,
      fullPage: true
    };
  },
  methods: {
    changeLoadingState(nowState) {
      this.isLoading = nowState;
    },
    onCancel() {
      console.log("User cancelled the loader.");
    },
    openModal: function() {
      this.showContent = true;
    },
    closeModal: function() {
      this.showContent = false;
    },
    addArt() {
      var me = this;
      me.isLoading = true;
      let user = firebase.auth().currentUser;
      const path = "images/" + user.uid + "/photo.png";
      const photoImagesRef = storageProfilePhotoRef.child(path);
      this.croppaData.generateBlob(blob => {
        var uploadTask = photoImagesRef.put(blob);
        uploadTask.on(
          firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
          function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log("Upload is paused");
                break;
              case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log("Upload is running");
                break;
            }
          },
          function(error) {},
          function() {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref
              .getDownloadURL()
              .then(function(downloadURL) {
                console.log("File available at", downloadURL);
                const artsRef = firebase.firestore().collection(user.uid);
                const payload = {
                  photoUrl: downloadURL,
                  title: me.title,
                  description: me.description
                };
                artsRef.add(payload).then(function() {
                  me.isLoading = false;
                });
              });
          }
        );
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.ArtForm {
  margin-top: 20px;
  flex-direction: column;
}
.mainArea {
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
  display: flex;
  flex-wrap: wrap;
}
.imageArea {
  flex-basis: 250px;
  margin-right: 20px;
  flex-grow: 1;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.imageArea img {
  width: 100%; /* 横幅を割合で指定 */
  height: auto; /* 高さは自動指定 */
}

.formArea {
  flex-grow: 5;
  flex-shrink: 0;
  align-items: center;
  flex-direction: column;
}
#overlay {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.titleArea input {
  margin-top: -10px;
  border: none;
}

.formArea textarea {
  margin-top: -10px;
  border: none;
}
.titleArea {
  border-bottom: 2px solid gray;
}
.descriptionArea {
  margin-top: 10px;
  border-bottom: 2px solid gray;
}
p.description {
  text-align: left;
  font-size: large;
  font-weight: bold;
}
</style>
