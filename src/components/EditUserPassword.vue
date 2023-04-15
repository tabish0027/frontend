<template>
  <v-container my-5>
    <v-layout style="font-size: 32px; color: black">
      Edit User Profile Password
    </v-layout>
    <v-layout>
      <v-layout column class="mt-5">
        <v-flex row class="align-center justify-center mt-3">
        <h1 class="fieldName px-4">Name</h1>
        <v-text-field
                      class="textfields_style mb-4"
                      label="Enter name"
                      solo
                      hide-details
        />
        <h1 class="fieldName px-4">Phone Number</h1>
        <v-text-field class="textfields_style mb-4"
                    label="Enter Phone Number"
                    solo
                    hide-details
        />
        </v-flex>
        <v-flex row class="align-center justify-center mt-3">
          <h1 class="fieldName px-4">Address</h1>
          <v-text-field class="textfields_style my-3"
                        label="Enter Address"
                        solo
                        hide-details
          />
        </v-flex>
        <v-flex row class="align-center justify-center mt-3">
          <h1 class="fieldName px-4">Team</h1>
          <v-text-field class="textfields_style my-3"
                      label="Enter Team name"
                      solo
                      hide-details
        />
        <h1 class="fieldName px-4">Local Time</h1>
        <v-text-field class="textfields_style my-4"
                      label="Local time"
                      solo
                      hide-details
        />
        </v-flex>
        <v-flex row class="align-center justify-center mt-3">
        <h1 class="fieldName px-4">Password</h1>
        <v-text-field class="textfields_style my-4"
                      label="Enter password"
                      solo
                      hide-details
        />
        <h1 class="fieldName px-4">Email Address</h1>
        <v-text-field class="textfields_style my-4"
                      label="Enter email address"
                      solo
                      hide-details
        />
        </v-flex>
        <v-flex>
          <v-btn
            class="AddNewUser mt-5 align-center justify-center"
            color="#8de867"
            elevation="13"
            large
            @click="logIntoDashboard()"
          >
            SIGN IN
          </v-btn>
        </v-flex>
       </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "EditUserPassword",
}
</script>
<style>
.fieldName{
  font-size: 18px;
  color: black;
}

.AddNewUser{
  border-radius: 20px;
}

.v-text-field--solo.textfields_style, .v-input__slot.textfields_style{
  border: 1px solid #8de867 !important;
  background-color: #8de867 !important;
  border-radius: 5px !important;
}

</style>
