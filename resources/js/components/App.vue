<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
      v-if = "isLogin()"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row
            v-if="item.heading"
            :key="item.heading"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
            <v-col
              cols="6"
              class="text-center"
            >
              <a
                href="#!"
                class="body-2 black--text"
              >EDIT</a>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.text }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.text"
            link
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="blue darken-3"
      dark
      v-if="isLogin()"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title
        style="width: 300px"
        class="ml-0 pl-4"
      >
        <span class="hidden-sm-and-down">Starter Pack</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      
      <v-menu offset-y v-if = "isLogin()">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          large
          v-bind="attrs"
          v-on="on"
        >
          <v-avatar
          size="32px"
          item
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          ></v-img></v-avatar>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="(item, i) in userItems"
          :key="i"
          @click="apply_func(item.func)"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </v-app-bar>
    <v-main>
      <v-container
        fluid
      >
          <router-view></router-view>

      </v-container>
    </v-main>
    
    <floating-button 
        @popupFormDialog="openFormDialog"
        v-show="isLogin()">
    </floating-button>
    
    <edit-contact-form :dialog="contactDialog"  @closeDialog="closeFormDialog"></edit-contact-form>

  </v-app>
</template>

<script>
  import FloatingButton from './FAB'
  import EditContactForm from "./dialogs/EditContactForm"

  export default {
    props: {
      source: String,
    },
    data: () => ({
      contactDialog: false,
      drawer: null,
      items: [
        { icon: 'mdi-contacts', text: 'Home' },
        { icon: 'mdi-content-copy', text: 'Settings' },
        { icon: 'mdi-keyboard', text: 'Others' },
      ],
      userItems: [
          {title: 'Logout', func: 'logout'},
          {title: 'Help', func: ''}
        ],
    }),
    methods: {
      

      isLogin () {
        return localStorage.getItem("_token") != null
      },
      
      logout () {
        localStorage.removeItem('_token');
        this.$forceUpdate();
        this.$router.push("/login");
        },
      apply_func(func_name) {
        if (func_name) this[func_name]()
      },
      openFormDialog (payload){
        this[payload.form] = true
        this.formAction = payload.action
      },
      closeFormDialog (form) {
        this[form] = false
        this.formAction = null
      }
      
    },
    components:{
        EditContactForm,
        FloatingButton
    }
  }
</script>