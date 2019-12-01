<template lang="html">
<div>
  <croppa v-model="myCroppa"
    :width="350"
    :height="350"
    placeholder="please choose image"
    placeholder-color="#000"
    :placeholder-font-size="24"
    canvas-color="white"
    :show-remove-button="true"
    remove-button-color="black"
    :show-loading="true"
    :loading-size="50"
    accept="image/*"
    :file-size-limit="2000000"
    @file-type-mismatch="onFileTypeMismatch"
    @file-size-exceed="onFileSizeExceed">
  ></croppa>
  <div>
  <b-button @click="uploadResizedPhoto">アップロード</b-button>
  <button @click="outPut">Output</button>
  </div>
</div>
</template>

<script>
import firebase from "@/firebase/firebase";

const storage = firebase.storage();
// ここでは仮にprofilePhotoというstorageを作成しています。
export const storageProfilePhotoRef = storage.ref("profilePhoto");

export default {
  name: "ImageUp",
  data() {
    return {
      myCroppa: {}
    };
  },
  methods: {
    outPut() {
      this.$parent.imageData = this.myCroppa.generateDataUrl();
      this.$parent.croppaData = this.myCroppa;
      console.log(this.$parent.imageData);
      console.log(this.$parent.croppaData);
    },
    onFileTypeMismatch(file) {
      alert("jpg, gif, png　形式でアップして下さい。");
    },
    onFileSizeExceed(file) {
      alert("ファイルは2mb以下でアップロードして下さい。");
    },
    uploadResizedPhoto() {
      let user = firebase.auth().currentUser;
      console.log(user);
      // userプロパティのdispalyNameをpathとして使っています。
      const path = "images/" + user.uid + "/photo.png";
      const photoImagesRef = storageProfilePhotoRef.child(path);
      // generateBlobで、画像からblobオブジェクトを作成します。
      // blobオブジェクトをそのままputメソッドで、Cloud Storageにアップしています。
      this.myCroppa.generateBlob(blob => {
        photoImagesRef
          .put(blob)
          .then(snapshot => {
            // アップが完了したら、ダウンロードURLを取得して、
            // UserプロパティのphotoURLに書き込みます。
            const photoURL = snapshot.downloadURL;
            if (user) {
              user
                .updateProfile({
                  photoURL: photoURL
                })
                .then(() => {})
                .catch(error => {});
            }
          })
          .catch(error => {
            console.log("upload error:", error);
          });
      });
    }
  }
};
</script>

<style>
.croppa-container {
  background-color: lightblue;
  border: 2px solid grey;
  border-radius: 8px;
}

.croppa-container:hover {
  opacity: 1;
  background-color: #8ac9ef;
}
</style>
