<template>
  <div class="signup">
    <h2>Sign up</h2>
    <div class="w-50">
      <b-form-input v-model="userId" placeholder="UserID"></b-form-input>
      <b-form-input v-model="userName" placeholder="Username"></b-form-input>
      <b-form-select v-model="selected" :options="userType" class="mb-1"></b-form-select>
      <b-form-input v-model="password" placeholder="Password" type="password"></b-form-input>
    </div>
    <button @click="signUp">Register</button>
    <button @click="logOut">Logout</button>
    <p>
      Do you have an account?
      <router-link to="/signin">sign in now!!</router-link>
    </p>
  </div>
</template>

<script>
import firebase from "@/firebase/firebase";

export default {
  name: "Signup",
  data() {
    return {
      userId: "",
      userName: "",
      password: "",
      selected: null,
      userType: [
        { value: null, text: "---Are You?---" },
        { value: `creator`, text: `Creator` },
        { value: `owner`, text: `Owner` }
      ]
    };
  },
  methods: {
    signUp: function() {
      console.log(this.userType);
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.userId, this.password)
        .then(() => {
          alert("Create Account");
        })
        .then(() => {
          let user = firebase.auth().currentUser;
          let Ref = firebase
            .firestore()
            .collection("users")
            .doc(user.uid);
          Ref.set({
            userUid: user.uid,
            userType: this.userType,
            userName: this.userName
          });
          console.log(user);
        })
        .then(() => {
          this.$router.push("/arts");
        })
        .catch(error => {
          alert(error.message);
        });
    },
    logOut: function() {
      alert("logout!");
      firebase.auth().signOut();
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
.signup {
  margin-top: 20px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}
input {
  margin: 10px 0;
  padding: 10px;
}
</style>
