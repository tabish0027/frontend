
<script>
import dlivrdlogo from '../assets/dlivrdlogo.png'
import axios from 'axios';
import { AtomSpinner } from 'epic-spinners'
export default {
  name: "LoginPage",
  components:{AtomSpinner },
  data (){
    return {
      dlivrdlogodata:dlivrdlogo,
      username: 'admin@email.com',
      userPassword:'1',
      alert_title: "",
      alert_description: "",
      dialog: false,
      showError: false,
      errorMessage: null, loading:true,
    }
  },

  methods:{
    login(){
      // this.$router.push( "adminonboard/dashboard" );

      if(this.username == "" && this.userPassword == ""){
        this.showError = true;
        this.errorMessage = "Please fill all the fields";

      }
      else if(this.username == ""){
        this.showError = true;
        this.errorMessage = "Username cannot be empty";
      }
      else if(this.userPassword == ""){
        this.showError = true;
        this.errorMessage = "Password cannot be empty";
      }
      else{
        // var validUsername = this.emailValidation(this.username)
        var validUsername = true
        if(validUsername) {
          this.loading = false
          var url = this.baseurl + 'admin_signin'
          const data = {
            email: this.username,
            password: this.userPassword,
          }
          console.log(data)
          axios.post(url, data, {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
            }
          }).then((response) => {
            this.loading = true
            if (response.status == 200) {
              console.log(response)
              var processLogin = response.data
              if (processLogin['Failure']) {
                this.showError = true;
                this.errorMessage = processLogin.Failure
              } else {
                // work in progress need to start from here
                localStorage.setItem('username', this.username)
                localStorage.setItem('session_id', processLogin.session_id)
                this.$router.push('adminonboard/dashboard')
              }
            }
          }).catch(() => {
            console.log("Login Failed!");
          })
        }
      }
    }
  }
}

</script>
<template>

  <div class="authentication">

    <v-container fluid class="pa-3">

      <v-row justify="center">

        <v-dialog
            v-model="dialog"
            transition="dialog-top-transition"
            width="auto"
        >

          <v-card>
            <v-card-title class="text-h5">
              {{alert_title}}
            </v-card-title>
            <v-card-text>{{alert_description}}</v-card-text>
            <v-card-actions style="align-self: end; margin-top: 30px">
              <v-spacer></v-spacer>
              <v-btn
                  v-if="alert_title == 'Warning'"
                  style="background-color: #7efb01"
                  variant="text"
                  @click="dialog = false">
                Okay
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>

      <v-row class="h-100vh d-flex justify-center align-center">

        <v-col cols="12" lg="4" xl="3" class="d-flex align-center">

          <v-card rounded="md" elevation="10" class="px-sm-1 px-0 withbg mx-auto" max-width="500">
            <v-card-item class="pa-sm-8">
              <atom-spinner v-if="!loading" :animation-duration="700" :size="180" color="#0AFD01" style="position: absolute;margin-left: auto;margin-right: auto;top:200px;left: 0;right: 0;text-align: center;" />
              <div class="d-flex justify-center py-4">
                <Logo />
              </div>
              <v-img :src="dlivrdlogodata"></v-img>
              <div class="text-body-1 text-muted text-center mb-3"></div>
              <v-row class="d-flex mb-3">
                <v-col class="field_box" cols="12">
                  <v-label class="font-weight-bold mb-1">Username</v-label>
                  <v-text-field
                      variant="outlined"
                      hide-details
                      color="primary"
                      v-model="username"
                      @keyup.enter="login"

                  ></v-text-field>
                </v-col>
                <v-col class="field_box" cols="12">
                  <v-label class="font-weight-bold mb-1">Password</v-label>
                  <v-text-field
                      variant="outlined"
                      type="password"
                      hide-details
                      color="primary"
                      v-model="userPassword"
                      @keyup.enter="login"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="pt-0">
                  <div class="d-flex flex-wrap align-center ml-n2">

                    <!--                <div class="ml-sm-auto">-->
                    <!--                    <RouterLink to="/"-->
                    <!--                        class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium">Forgot-->
                    <!--                        Password ?</RouterLink>-->
                    <!--                </div>-->
                  </div>
                </v-col>
                <v-col cols="12" class="pt-0" v-if="showError" style="color: red; width: 40px">
                    {{ errorMessage }}
                </v-col>
                <v-col cols="12" class="pt-0">
                  <v-btn :disabled="!loading"  @click="login()" color="#0AFD01" size="large" block flat>Sign in</v-btn>
                </v-col>
              </v-row>

            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<style scoped>
.h-100vh {
  height: 100vh;
}
.d-flex {
  display: flex !important;
}
.text-body-1 {
  font-size: 1rem !important;
  font-weight: 400;
  line-height: 1.5rem;
  letter-spacing: 0.03125em !important;
  font-family: "Roboto", sans-serif !important;
  text-transform: none !important;
}
.font-weight-medium {
  font-weight: 500 !important;
}
.authentication{
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  background: radial-gradient(rgb(210, 241, 223), rgb(211, 215, 250), rgb(186, 216, 244)) 0% 0% / 400% 400%;

}
.field_box{
  text-align: -webkit-left;
}
.main_background{
  background-color: #EFF3FD;
  width: 100vw;
  height: 100vh;
}
.forgotPassword{
  text-decoration: underline;
  font-size: 16px ;
}

.signInButton{
  border-radius: 5px;
  width: 80%;
}
.v-text-field--solo.inputTextField_style, .v-input__slot.inputTextField_style{
  border: 1px solid #8de867 !important;
  background-color: #8de867 !important;
  border-radius: 5px !important;

}
</style>
