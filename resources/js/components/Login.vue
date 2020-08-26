<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
    
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Login"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="handleLoginSubmit">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data() {
    return {
      email: "",
      password: "",
      errorMsg: false
    };
  },
  methods: {
    handleLoginSubmit(e) {
            e.preventDefault();

      if (this.password.length > 0) {
        axios
          .post("api/login", {
            email: this.email,
            password: this.password
          })
          .then(response => {
            //localStorage.setItem("user", response.data.success.name);
            if (response.data.success.token) localStorage.setItem("_token", response.data.success.token);

            if (localStorage.getItem("_token") != null) {
              this.$router.go("/home");
            }
          })
          .catch(error => {
            this.errorMsg = "Login Failed"
            delete localStorage.token
          });
      }
        }
    },

    beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("_token")) {
      return next("home");
    }

    next();
  }
  }
</script>