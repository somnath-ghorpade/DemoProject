<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <!-- <div class="card-header bg-transparent pb-5"> -->
                <!-- <div class="text-muted text-center mt-2 mb-3">
                        <small>Sign up with</small>
                    </div> -->
                <!-- <div class="btn-wrapper text-center">
                        <a href="#" class="btn btn-neutral btn-icon">
                            <span class="btn-inner--icon"><img src="img/icons/common/github.svg"></span>
                            <span class="btn-inner--text">Github</span>
                        </a>
                        <a href="#" class="btn btn-neutral btn-icon">
                            <span class="btn-inner--icon"><img src="img/icons/common/google.svg"></span>
                            <span class="btn-inner--text">Google</span>
                        </a>
                    </div> -->
                <!-- </div> -->
                <div class="card-body px-lg-10 py-lg-5">
                    <!-- <div class="text-center text-muted mb-4">
                        <small>sign up with credentials</small>
                    </div> -->
                    <form role="form">
                        <base-input class="input-group-alternative mb-3" placeholder="Name" addon-left-icon="ni ni-hat-3" v-model="profile.name">
                        </base-input>

                        <base-input class="input-group-alternative mb-3" placeholder="Email" addon-left-icon="ni ni-email-83" v-model="profile.email">
                        </base-input>
                        <base-input addon-left-icon="ni ni-calendar-grid-58">
                            <flat-pickr v-model="profile.birthdate" :config="dateconfig" @keyup.enter="trigger" type="date" id="dobCalendar" name="Certificate Date" placeholder="Birth date" addon-left-icon="ni ni-calendar-grid-58">
                            </flat-pickr>
                        </base-input>
                        <base-input class="input-group-alternative mb-3 " placeholder="Mobile Number" maxLength="10" v-validate="{numeric:true,regex: /^((?![0-6])[0-9]{10})$/}" name="registration.mobile" addon-left-icon="ni ni-mobile-button" v-model="profile.mobile" data-vv-as="mobile">
                        </base-input>
                        <small v-show="errors.has('registration.mobile')" class="text-danger mb-2">{{ errors.first('registration.mobile') }}</small>
                        <base-input class="input-group-alternative mb-3" placeholder="LoginID" addon-left-icon="ni ni-hat-3" v-model="profile.loginId">
                        </base-input>
                                               <!-- <input type="password" maxlength="100" id="txt_password" name="registration.password" v-validate="'required'" @keyup="passwordChanged()" @focusout="isValidPassword()" v-model.trim="profile.password" class="form-control" data-vv-as="password">
                             <small class="help" v-show="!errors.has('registration.password')" id="strength"></small>
                            <small v-show="errors.has('registration.password')" class="text-danger">{{ errors.first('registration.password') }}</small> -->

                        <base-input class="input-group-alternative" id="txt_password" maxlength="100"  name="registration.password" @keyup="passwordChanged()" @focusout="isValidPassword()" placeholder="Password" v-validate="'required'"  type="password" addon-left-icon="ni ni-lock-circle-open" v-model="profile.password" data-vv-as="password">
                        </base-input>
                         <small v-show="errors.has('registration.password')" class="text-danger">{{ errors.first('registration.password') }}</small>

                        <!-- <input type="password" @focus="resetValidator()" maxlength="100" v-validate="'required'" name="registration.confirmPassword" @keyup.enter="trigger" v-model.trim="passwordConfirmation" class="form-control" data-vv-as="confirm password">
                            <small v-show="errors.has('registration.confirmPassword')" style="color:red;" class="text-danger">{{ errors.first('registration.confirmPassword') }}</small>
                          -->
                        <base-input class="input-group-alternative"  @focus="resetValidator()" maxlength="100" v-validate="'required'" name="registration.confirmPassword" @keyup.enter="trigger" placeholder="Confirm Password" data-vv-as="confirm password" type="password" addon-left-icon="ni ni-lock-circle-open" v-model="profile.confirmPassword">
                        </base-input>
                        <small v-show="errors.has('registration.confirmPassword')" style="color:red;" class="text-danger">{{ errors.first('registration.confirmPassword') }}</small>

                        <base-input v-model="profile.address" class="input-group-alternative mb-3" placeholder="Residential Address" addon-left-icon="ni ni-building">
                        </base-input>

                        <!-- <div class="text-muted font-italic">
                            <small>password strength: <span class="text-success font-weight-700">strong</span></small>
                        </div> -->

                        <!-- <div class="row my-4">
                            <div class="col-12">
                                <base-checkbox class="custom-control-alternative">
                                    <span class="text-muted">I agree with the <a href="#!">Privacy Policy</a></span>
                                </base-checkbox>
                            </div>
                        </div> -->
                        <div class="text-center">
                            <base-button type="primary" class="my-4" @click.prevent="saveProfileDetails">Register</base-button>
                        </div>
                    </form>
                </div>
            </div>
            <!-- <div class="row mt-3">
                <div class="col-6">
                    <a href="#" class="text-light">
                        <small>Forgot password?</small>
                    </a>
                </div>
                <div class="col-6 text-right">
                    <router-link to="/login" class="text-light">
                        <small>Login into your account</small>
                    </router-link>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
export default {
  name: 'register',
  components: {
    flatPickr
  },
  data() {
    return {
      profile: {
        name: '',
        loginId: '',
        email: '',
        password: '',
        confirmPassword: '',
        address: '',
        birthdate: '',
        mobile:''
      },
      dateconfig: {
        // altFormat: 'd.m.Y',
        altFormat: 'd-M-Y',
        altInput: true,
        maxDate: new Date()
      }
    }
  },
  methods: {
    saveProfileDetails() {
      let profileData = this.profile
      console.log("in save profile")
      axios
        .post('/o/savedata', profileData)
        .then(function(response) {
          if (response.status === 200) {
            this.$toasted.sucess('record inserted')
          }
        })
        .catch(err => {
          console.error(err)
        //   alert('Registration.toasters.registrationFail')
        })
    },
    trigger() {
      this.confirmationOnRegister()
    },
     passwordChanged() {
      let isValidPassword = false
      let strongRegex = new RegExp('^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?!.*\\s).*$', 'g')
      let pwd = document.getElementById('txt_password')
      if (strongRegex.test(pwd.value)) {
        isValidPassword = true
      } else {
        isValidPassword = false
      }
      return isValidPassword
    },
     resetValidator() {
      this.$validator.reset()
    },
     confirmationOnRegister() {
      // console.log('profile', this.profile)
      this.$validator
        .validateAll({
          'registration.fullname': this.profile.name,
          'registration.gender': this.profile.gender,
          'registration.mobile': this.profile.mobileNo,
        //   'registration.district': this.profile.citizenAddress.district,
        //   'registration.taluka': this.profile.citizenAddress.tehsil,
          'registration.city': this.profile.address,
          'registration.loginId': this.profile.loginId,
          'registration.password': this.profile.password,
          'registration.confirmPassword': this.profile.confirmPassword
        })
        .then(result => {
          if (!result) {
            this.$toasted.error('Registration.toasters.validateError')
            return
          } else {
            if (this.profile.confirmPassword !== this.profile.password) {
              this.$toasted.error('Registration.toasters.passwordMatchingErr')
              return
            }
            if (!this.passwordChanged()) {
              this.$toasted.error('Registration.toasters.passwordNotSatisfy')
              return
            }
            if (this.profile.mobileNo !== undefined && this.profile.mobileNo !== null && this.profile.mobileNo.length === 10 && !this.isOtpVerified) {
              this.$toasted.error('Registration.toasters.verifyMobileNumber')
              return
            }
            if (!this.isloginIdAvailable) {
              this.$toasted.error('Registration.toasters.loginAlreadyTaken')
              return
            }
            this.$refs.myModalRef.show()
          }
        })
    },
     isValidPassword() {
      if (!this.passwordChanged()) {
        this.$toasted.error('Registration.toasters.passwordNotSatisfy')
        return
      }
    },
  }
}
</script>
<style>
.row {
  margin-right: -150px;
  margin-left: -150px;
}
.custom-control {
  padding-left: 25rem;
}

.form-control[readonly] {
  background-color: white;
  opacity: 1;
}
pt-7, .py-7 {
    padding-top: rem ;
}
</style>
