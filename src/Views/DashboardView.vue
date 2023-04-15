<script>
import dlivrdlogo from '../assets/dlivrdlogo.png'
import axios from 'axios';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import VueMultiselect from 'vue-multiselect'
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';
import { AtomSpinner } from 'epic-spinners'

export default {
  name: "LoginPage",
  watch: {
    group () {
      this.drawer = false
    },
    slot_country(){
      //alert('changed')
    },search_date_range(){

    },
    items_per_page(){
      alert(this.items_per_page)
    },
    options(){
      this.loadTableData()
    },
    search_date_range_applied(){

      this.dateRangeApplied()
    }

    // options:{
    //   handler(){
    //     console.log("Event type")
    //
    //   },
    //}
  },
  components:{DatePicker,VueMultiselect,AtomSpinner},
  data (){
    return {
      items:['On Board'],
      slot_country:'ALL',
      slot_stage:'ALL',
      slot_status:'ALL',
      slot_date_range:'',
      items_per_page:10,
      loading: true,
      itemsOnPage: [5,30,50,-1],
      footerProps: {
        'items-per-page-options': [5,10,30,50,-1],
      },
      query_search:'',
      alert_title:'',
      filter_dropdown: [
        { title: 'All' },
        { title: 'Active' },
        { title: 'Inactive' },
        { title: 'Block' },
        { title: 'Completed' },
      ],
      filter_dropdown_stage: [
        { title: 'All' },
        { title: 'Module 1' },
        { title: 'Module 2' },
        { title: 'Module 3' },
        { title: 'Module 4' },
        { title: 'Completed' },
      ],
      filter_dropdown_city: [{ title: "Akron, OH"},{ title: "Detroit, MI"},{ title: "Albuquerque, NM"},{ title: "Augusta, GA"},{ title: "Boise, ID"},{ title: "Buffalo, NY"},{ title: "Charleston, SC"},{ title: "Cincinnati, OH"},{ title: "Cleveland, OH"},{ title: "College Station, TX"},{ title: "Colorado Springs, CO"},{ title: "Columbia, SC"},{ title: "Columbus, OH"},{ title: "El Paso, TX"},{ title: "Fayetteville, NC"},{ title: "Fort Lauderdale, FL"},{ title: "Fort Wayne, IN"},{ title: "Harrisburg, PA"},{ title: "Indianapolis, IN"},{ title: "Knoxville, TN"},{ title: "Long Island, NY"},{ title: "Memphis, TN"},{ title: "Milwaukee, WI"},{ title: "Mobile, AL"},{ title: "Modesto, CA"},{ title: "Montgomery, AL"},{ title: "Myrtle Beach, SC"},{ title: "New Orleans, LA"},{ title: "Norfolk, VA"},{ title: "Oklahoma City, OK"},{ title: "Omaha, NE"},{ title: "Provo, UT"},{ title: "Raleigh, NC"},{ title: "Reno, NV"},{ title: "Richmond - Petersburg, VA"},{ title: "San Antonio, TX"},{ title: "San Bernardino, CA"},{ title: "San Diego, CA"},{ title: "South Bend, IN"},{ title: "Stockton, CA"},{ title: "Tampa, FL"},{ title: "Tucson, AZ"},{ title: "Tulsa, OK"},{ title: "West Palm Beach, FL"},{ title: "Wichita, KS"},{ title: "Portland, OR"},{ title: "Sacramento, CA"},{ title: "Salt Lake City, UT"},{ title: "Savannah, GA"},{ title: "Orlando, FL"},{ title: "Miami, FL"},{ title: "Greensboro, NC"},{ title: "Jacksonville, FL"},{ title: "Kansas City, MO"},{ title: "Louisville, KY"},{ title: "Nashville, TN"},{ title: "St Louis, MO"},{ title: "Pittsburgh, PA"},{ title: "Vancouver, BC"},{ title: "Atlanta, GA"},{ title: "DFW"},{ title: "DC Metro"},{ title: "Denver, CO"},{ title: "Austin, TX"},{ title: "Boston, MA"},{ title: "Chicago, IL"},{ title: "Houston, TX"},{ title: "Los Angeles, CA"},{ title: "New York, NY"},{ title: "North Jersey"},{ title: "Philadelphia, PA"},{ title: "Phoenix, AZ"},{ title: "San Francisco, CA"},{ title: "Seattle, WA"},{ title: "Toronto, ON"},{ title: "Charlotte, NC"},{ title: "Minneapolis, MN"},{ title: "Ventura, CA"},{ title: "Albany, NY"},{ title: "Baltimore, MD"},{ title: "Orange County, CA"},{ title: "Las Vegas, NV"},{ title: "Hartford, CT"},{ title: "San Jose, CA"},{ title: "Wilmington-Newark, DE"},{ title: "Fort Myers, FL"},{ title: "Sarasota, FL"},{ title: "Naples, FL"},{ title: "Ocala, FL"},{ title: "Gainesville, FL"},{ title: "Daytona Beach, FL"},{ title: "Lakeland, FL"},{ title: "Pensacola, FL"},{ title: "Melbourne, FL"},{ title: "Fort Pierce, FL"},{ title: "Providence, RI"},{ title: "Rochester, NY"},{ title: "Syracuse, NY"},{ title: "Lawrence, MA"},{ title: "Greenville, SC"}],
      filter_dropdown_state: [{ title: "Akron, OH"},{ title: "Detroit, MI"},{ title: "Albuquerque, NM"},{ title: "Augusta, GA"},{ title: "Boise, ID"},{ title: "Buffalo, NY"},{ title: "Charleston, SC"},{ title: "Cincinnati, OH"},{ title: "Cleveland, OH"},{ title: "College Station, TX"},{ title: "Colorado Springs, CO"},{ title: "Columbia, SC"},{ title: "Columbus, OH"},{ title: "El Paso, TX"},{ title: "Fayetteville, NC"},{ title: "Fort Lauderdale, FL"},{ title: "Fort Wayne, IN"},{ title: "Harrisburg, PA"},{ title: "Indianapolis, IN"},{ title: "Knoxville, TN"},{ title: "Long Island, NY"},{ title: "Memphis, TN"},{ title: "Milwaukee, WI"},{ title: "Mobile, AL"},{ title: "Modesto, CA"},{ title: "Montgomery, AL"},{ title: "Myrtle Beach, SC"},{ title: "New Orleans, LA"},{ title: "Norfolk, VA"},{ title: "Oklahoma City, OK"},{ title: "Omaha, NE"},{ title: "Provo, UT"},{ title: "Raleigh, NC"},{ title: "Reno, NV"},{ title: "Richmond - Petersburg, VA"},{ title: "San Antonio, TX"},{ title: "San Bernardino, CA"},{ title: "San Diego, CA"},{ title: "South Bend, IN"},{ title: "Stockton, CA"},{ title: "Tampa, FL"},{ title: "Tucson, AZ"},{ title: "Tulsa, OK"},{ title: "West Palm Beach, FL"},{ title: "Wichita, KS"},{ title: "Portland, OR"},{ title: "Sacramento, CA"},{ title: "Salt Lake City, UT"},{ title: "Savannah, GA"},{ title: "Orlando, FL"},{ title: "Miami, FL"},{ title: "Greensboro, NC"},{ title: "Jacksonville, FL"},{ title: "Kansas City, MO"},{ title: "Louisville, KY"},{ title: "Nashville, TN"},{ title: "St Louis, MO"},{ title: "Pittsburgh, PA"},{ title: "Vancouver, BC"},{ title: "Atlanta, GA"},{ title: "DFW"},{ title: "DC Metro"},{ title: "Denver, CO"},{ title: "Austin, TX"},{ title: "Boston, MA"},{ title: "Chicago, IL"},{ title: "Houston, TX"},{ title: "Los Angeles, CA"},{ title: "New York, NY"},{ title: "North Jersey"},{ title: "Philadelphia, PA"},{ title: "Phoenix, AZ"},{ title: "San Francisco, CA"},{ title: "Seattle, WA"},{ title: "Toronto, ON"},{ title: "Charlotte, NC"},{ title: "Minneapolis, MN"},{ title: "Ventura, CA"},{ title: "Albany, NY"},{ title: "Baltimore, MD"},{ title: "Orange County, CA"},{ title: "Las Vegas, NV"},{ title: "Hartford, CT"},{ title: "San Jose, CA"},{ title: "Wilmington-Newark, DE"},{ title: "Fort Myers, FL"},{ title: "Sarasota, FL"},{ title: "Naples, FL"},{ title: "Ocala, FL"},{ title: "Gainesville, FL"},{ title: "Daytona Beach, FL"},{ title: "Lakeland, FL"},{ title: "Pensacola, FL"},{ title: "Melbourne, FL"},{ title: "Fort Pierce, FL"},{ title: "Providence, RI"},{ title: "Rochester, NY"},{ title: "Syracuse, NY"},{ title: "Lawrence, MA"},{ title: "Greenville, SC"}],
      filter_dropdown_country: ["All","Akron, OH","Detroit, MI","Albuquerque, NM","Augusta, GA","Boise, ID","Buffalo, NY","Charleston, SC","Cincinnati, OH","Cleveland, OH","College Station, TX","Colorado Springs, CO","Columbia, SC","Columbus, OH","El Paso, TX","Fayetteville, NC","Fort Lauderdale, FL","Fort Wayne, IN","Harrisburg, PA","Indianapolis, IN","Knoxville, TN","Long Island, NY","Memphis, TN","Milwaukee, WI","Mobile, AL","Modesto, CA","Montgomery, AL","Myrtle Beach, SC","New Orleans, LA","Norfolk, VA","Oklahoma City, OK","Omaha, NE","Provo, UT","Raleigh, NC","Reno, NV","Richmond - Petersburg, VA","San Antonio, TX","San Bernardino, CA","San Diego, CA","South Bend, IN","Stockton, CA","Tampa, FL","Tucson, AZ","Tulsa, OK","West Palm Beach, FL","Wichita, KS","Portland, OR","Sacramento, CA","Salt Lake City, UT","Savannah, GA","Orlando, FL","Miami, FL","Greensboro, NC","Jacksonville, FL","Kansas City, MO","Louisville, KY","Nashville, TN","St Louis, MO","Pittsburgh, PA","Vancouver, BC","Atlanta, GA","DFW","DC Metro","Denver, CO","Austin, TX","Boston, MA","Chicago, IL","Houston, TX","Los Angeles, CA","New York, NY","North Jersey","Philadelphia, PA","Phoenix, AZ","San Francisco, CA","Seattle, WA","Toronto, ON","Charlotte, NC","Minneapolis, MN","Ventura, CA","Albany, NY","Baltimore, MD","Orange County, CA","Las Vegas, NV","Hartford, CT","San Jose, CA","Wilmington-Newark, DE","Fort Myers, FL","Sarasota, FL","Naples, FL","Ocala, FL","Gainesville, FL","Daytona Beach, FL","Lakeland, FL","Pensacola, FL","Melbourne, FL","Fort Pierce, FL","Providence, RI","Rochester, NY","Syracuse, NY","Lawrence, MA","Greenville, SC","Fayetteville, AR","Tuscaloosa, AL","Huntsville, AL","Birmingham, AL","Columbus, GA","Macon, GA","Fort Collins, CO","Tacoma, WA","Lexington, KY","Bakersfield, CA","Fresno, CA","Lubbock, TX","Odessa, TX","Salisbury, MD","Little Rock, AR","Jackson, MS","Biloxi, MS","Baton Rouge, LA","Gary, IN","Lafayette, LA","Evansville, IN","Dayton, OH","Chattanooga, TN","Grand Rapids, MI","Canton, OH","Toledo, OH","Monmouth, NJ","Johnson City, TN","Lansing, MI","Youngstown, OH","Ann Arbor, MI","Lancaster, PA","Flint, MI","Middlesex, NJ","New Haven, CT","Wilmington, NC","Athens, GA","Hamilton, OH","Lehigh Valley, PA"],
      alert_description:'',
      dialog:false,
      agreeButtonText:'',
      cancelButtonText:'',
      dlivrdlogodata:dlivrdlogo,
      drawer:false,
      searchbox:true,
      search_date_range_applied:"",
      search_date_range_last_login:"",
      totalDesserts: 0,
      expanded: [],
      singleExpand: false,
      drivers: [],
      selected: null,
      statusoptions: ['list', 'of', 'options'],
      email: '',
      session: null,
      options: {},
      headers: [
        {
          title: 'Name',
          align: 'start',
          sortable: false,
          key: 'first_name',
        },
        { title: 'Email', key: 'email' ,align: 'left',},
        { title: 'Phone', key: 'phone' ,align: 'left',},
        { title: 'Date Applied', key: 'date_applied' ,align: 'left',},
        { title: 'Last Login', key: 'last_login',align: 'left', },
        { title: 'Stage', key: 'stage' ,align: 'left',},
        { title: 'Status', key: 'status' ,align: 'left',},
        { title: 'City', key: 'city' ,align: 'left',},
        { title: 'Country', key: 'country' ,align: 'left',},
        { title: 'State', key: 'states' ,align: 'left',},
      ],
      limit: 5,
      offset:0,
      offsetCount: 1,
      totalRecords: 0,
      filter_by_value: "by_regex",
      sortKey: "last_created",
      sortOrder: "descending",
      selected_stage: "",
      selected_country: "",
      selected_status: "",
    }
  },
  mounted() {
    this.validateSession()
    // this.getUsers()
    this.email = localStorage.getItem('username')
    this.session = localStorage.getItem('session_id')
  },
  methods:{
    formatedate(dateinput){
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
      var date = String(dateinput)
      date = date.split(' ')
      if(date.length > 5){
        var month = months.indexOf(date[1]) + 1
        if(month < 10)
        {
          month = '0' + month
        }
        console.log(date[3] + '-' + month + '-' + date[2])
        return date[3] + '-' + month + '-' + date[2];
      }
      else{
        return  ''
      }

    },
    dateRangeApplied(){
      console.log(typeof(search_date_range_applied))
      console.log(this.search_date_range_applied)
      // var date = new Date(this.search_date_range_applied[0])
      console.log(this.search_date_range_applied[0])

      console.log(this.formatedate())
    },
    loadTableData(){
      console.log("Data printning")
      if(this.options['sortBy'].length != 0){
        this.sortKey = this.options['sortBy'][0].key
        this.sortOrder = this.options['sortBy'][0].order
      }
      if(this.sortOrder == 'asc'){
        this.sortOrder = 'ascending'
      }
      if(this.sortOrder == 'desc'){
        this.sortOrder = 'descending'
      }
      console.log("Sorting Orders")

      this.getUsers()
    },
    logIntoDashboard(){
      this.$router.push({ name: "AdminDashboard" });
    },
    validateSelection(selection) {
      this.selected = selection;
      console.log(selection.name + " has been selected");
    },
    getDropdownValues(keyword) {
      console.log("You could refresh options by querying the API with " + keyword);
    },
    logout(){
      this.alert_title = "Confirmation";
      this.alert_description = "Are you sure that you want to logout?";
      this.dialog = true;
      this.agreeButtonText = "Logout";
      this.cancelButtonText = "Cancel"
    },
    item_selected(item_selected){
      alert(item_selected)
    },
    logoutOnboarding(){
      localStorage.setItem('email', '');
      localStorage.setItem('username','')
      localStorage.setItem('session_id','')
      this.dialog = false;
      // var current_address = window.location.href
      // current_address = current_address.replace('/dashboard','')
      this.$router.push('/adminonboard');
    },
    statusChange(statusval,rider_email_data){
      this.loading=true
      // this.validateSession();
      var url =this.baseurl + 'update_rider'
      var data = {email:localStorage.getItem('username'),rider_email:rider_email_data,blocked:statusval}
      axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "session": localStorage.getItem('session_id'),
          "sessiontype":'admin'
        }
      }).then((response) => {
        this.loading = false
        if(response.status == 200){
          if(response['data']['Success'] == 'Rider updated successfully.'){
            this.getUsers()
            console.log(response)
          }

        }
      }).catch(() => {
        this.message = "Not liked!";
      })
    },
    getUsers(){
      this.loading=true
      if(this.slot_stage == "ALL"){
        this.selected_stage = "";
      }
      if(this.slot_status == "ALL"){
        this.selected_status = "";
      }
      if(this.slot_country == "ALL"){
        this.selected_country = "";
      }

      var url =this.baseurl + 'admin_get_all_users'
      var data = {
        email:localStorage.getItem('username'),
        // filter_by: this.filter_by_value,
        filter_by: this.filter_by_value,
        // filter_value:this.query_search,
        page_number:this.options['page'],
        sort_by: this.sortKey,
        sort_by_order: this.sortOrder,
        records_per_page:10,
        search_query: {
          search_text: this.query_search,
          search_stage: this.selected_stage,
          search_team: this.selected_country,
          search_status: this.selected_status,
          search_date_applied: {
            start: this.formatedate(this.search_date_range_applied[0]),
            end: this.formatedate(this.search_date_range_applied[1])
          },
          search_date_lastLogin: {
            start: this.formatedate(this.search_date_range_last_login[0]),
            end: this.formatedate(this.search_date_range_last_login[1])
          },
        }
      }
      axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "session": localStorage.getItem('session_id'),
        }
      }).then((response) => {
        this.loading = false
        if(response.status == 200){
          this.drivers = response['data']['data']
          this.totalRecords = response['data']['total_records'];
        }
      }).catch(() => {
        this.message = "Not liked!";
      })
    },
    getCSVReport(){
      this.loading = true;
      var url =this.baseurl + 'admin_get_all_users_csv'
      var data = {
        email:localStorage.getItem('username'),
        filter_by: this.filter_by_value,
        // filter_value:this.query_search,
        sort_by: this.sortKey,
        sort_by_order: this.sortOrder,
        search_query: {
          search_text: this.query_search,
          search_stage: this.selected_stage,
          search_team: this.selected_country,
          search_status: this.selected_status,
          search_date_applied: {
            start: this.formatedate(this.search_date_range_applied[0]),
            end: this.formatedate(this.search_date_range_applied[1])
          },
          search_date_lastLogin: {
            start: this.formatedate(this.search_date_range_last_login[0]),
            end: this.formatedate(this.search_date_range_last_login[1])
          },
        }
      }
      axios.post(url, data, {

        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "session": localStorage.getItem('session_id'),
        }
      }).then((response) => {
        this.loading = false
        if(response.status == 200){
          console.log("CSV Report")
          console.log(response)
          var csvData = response.data
          // this.drivers = response['data']['data']
          var exportLink = document.createElement('a');
          exportLink.setAttribute('href', 'data:text/csv;base64,' + window.btoa(csvData));
          exportLink.appendChild(document.createTextNode('test.csv'));
          document.getElementById('results').appendChild(exportLink);
          console.log("csvData")
          console.log(csvData)
        }
      }).catch(() => {
        this.message = "Not liked!";
      })
    },
    validateSession(){
      var url =this.baseurl +'admin_verifySession'
      const data = {
        email: localStorage.getItem('username')
      }
      axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "session": localStorage.getItem('session_id'),
        }
      }).then((response) => {
        console.log(response['data'])
        if(response['data']['Failure'] == 'Session Expired. Please login again.'){
          alert('session_expired')
          this.$router.push('/adminonboard')
        }

      }).catch(() => {
        this.message = "Not liked!";
      })
    },
    selectStage(item){
      if(item == "All"){
        this.selected_stage = ""
      }
      else{
        this.selected_stage = item.replace(" ", "_")
      }
      this.slot_stage = item
    },
    selectStatus(item){
      if(item == "All"){
        this.selected_status = ""
      }
      else{
        this.selected_status = item.toLowerCase()
      }
      this.slot_status = item
    },
    selectCountry(item){
      if(item == "All"){
        this.selected_country = ""
      }
      else{
        // this.selected_country = item.split(",",1)
        this.selected_country = item
      }
      console.log(this.selected_country)
      this.slot_country=item
    }
  }
}

</script>
<template>
  <div class="authentication">
    <atom-spinner v-if="loading" class="loading_bar" :animation-duration="500" :size="150" color="#0AFD01" />
    <v-dialog
        v-model="dialog"
        transition="dialog-top-transition"
        width="auto"
        persistent
    >
      <v-card>
        <v-card-title class="text-h5">
          {{alert_title}}
        </v-card-title>
        <v-card-text>{{alert_description}}</v-card-text>
        <v-card-actions style="align-self: end; margin-top: 30px">
          <v-spacer></v-spacer>
          <v-btn
              v-if="cancelButtonText == 'Cancel'"
              style="background-color: #7efb01"
              variant="text"
              @click="dialog = false"
          >
            {{ cancelButtonText }}
          </v-btn>
          <v-btn
              v-if="agreeButtonText == 'Logout'"
              style="background-color: #7efb01"
              variant="text"
              @click="logoutOnboarding"
          >
            {{ agreeButtonText }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


    <v-container fluid >
      <v-layout>
        <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->
        <v-app-bar
            color="#8de867"
            class="top_bar_title"
            prominent
        >
          <v-app-bar-nav-icon variant="text"  @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
          <v-toolbar-title>Dlivrd Admin Portal</v-toolbar-title>
          <v-spacer></v-spacer>
          <!--          <v-btn variant="text" icon="mdi-magnify"></v-btn>-->
          <v-btn variant="text" icon="mdi-filter" @click.stop="searchbox = !searchbox"></v-btn>
          <v-menu width="180px">
            <template v-slot:activator="{ props }">
              <v-btn
                  icon
                  v-bind="props">
                <v-icon style="background-color: white; border-radius: 50%" size="32">mdi-account</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item prepend-icon="mdi-logout" title="Log Out" value="logout" @click="logout"></v-list-item>
            </v-list>
          </v-menu>
          <!--          <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>-->
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawer"
            location="left"
            temporary
        >
          <v-list
              :items="items"
          ></v-list>
        </v-navigation-drawer>
        <v-main style="height: 500px;">
          <Transition name="fade" mode="out-in">
            <v-card v-if="searchbox">
              <!--            append-icon="mdi-magnify"-->
              <v-card>
                <v-text-field
                    class="search_field"
                    v-model="query_search"
                    label="Search"
                    single-line
                    @keydown.enter="getUsers"
                    hide-details
                ></v-text-field>
              </v-card>
              <!--  Teams / Country  -->
              <v-card  style="width: 100%;display: flex;justify-content: flex-end;padding-bottom: 5px;">
                <v-card class="filter_block" style="padding-left: 10px;padding-right: 10px">
                  <p> Teams</p>
                  <div class="text-center">
                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <v-btn
                            v-bind="props"
                            style="width: 240px;background-color: #8de867;"
                        >
                          {{this.slot_country}}
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                            v-for="(item, index) in filter_dropdown_country"
                            :key="index"
                            :value="index"
                            @click="selectCountry(item)"
                        >
                          <v-list-item-title >{{ item }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                  <VueMultiselect
                      hidden
                      style="width: 150px"
                      v-model="selected"
                      :options="statusoptions">
                  </VueMultiselect>
                  <!--                v-on:selected="onSelectedOption"-->
                  <!--                v-on:filter="getDropdownValues"-->
                </v-card>
                <!--  Stage  -->
                <v-card class="filter_block" style="padding-left: 10px;padding-right: 10px">
                  <p> Stage</p>
                  <div class="text-center">
                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <v-btn
                            v-bind="props"
                            style="width: 140px;background-color: #8de867;"
                        >
                          {{ this.slot_stage }}
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                            v-for="(item, index) in filter_dropdown_stage"
                            :key="index"
                            :value="index"
                        >
                          <v-list-item-title @click="selectStage(item.title)">{{ item.title }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                  <VueMultiselect
                      hidden
                      style="width: 150px"
                      v-model="selected"
                      :options="statusoptions">
                  </VueMultiselect>
                  <!--                v-on:selected="onSelectedOption"-->
                  <!--                v-on:filter="getDropdownValues"-->
                </v-card>
                <!--  Status  -->
                <v-card class="filter_block" style="padding-left: 10px;padding-right: 10px">
                  <p> Status</p>

                  <div class="text-center">
                    <v-menu>
                      <template v-slot:activator="{ props }">
                        <v-btn
                            v-bind="props"
                            style="width: 140px;background-color: #8de867;"
                        >
                          {{ this.slot_status }}
                        </v-btn>
                      </template>
                      <v-list>
                        <v-list-item
                            v-for="(item, index) in filter_dropdown"
                            :key="index"
                            :value="index"
                        >
                          <v-list-item-title @click="selectStatus(item.title)">{{ item.title }}</v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                  <VueMultiselect
                      hidden
                      style="width: 150px"
                      v-model="selected"
                      :options="statusoptions">
                  </VueMultiselect>
                  <!--                v-on:selected="onSelectedOption"-->
                  <!--                v-on:filter="getDropdownValues"-->
                </v-card>

                <v-card class="filter_block">
                  <p> Date Applied</p>
                  <date-picker v-model:value="search_date_range_applied" range class="filter_block_sub" type="date" ></date-picker>
                </v-card>
                <v-card class="filter_block">
                  <p> Last login</p>
                  <date-picker v-model:value="search_date_range_last_login" range class="filter_block_sub"></date-picker>
                </v-card>
                <v-card style="text-align: right;padding-top: 5px" >
                  <v-btn class="button_item" @click="getUsers">Search</v-btn>
                  <v-btn class="button_item" @click="getCSVReport">CSV</v-btn>
                </v-card>
              </v-card>
            </v-card>
          </Transition>
          <v-card style="margin-top: 10px">
            <v-card-title>
              <v-spacer></v-spacer>
            </v-card-title>
            <!--            :search="search"-->
            <v-data-table-server
                :footer-props="footerProps"
                :headers="headers"
                :items="drivers"
                :items-length="totalRecords"
                show-expand
                class="elevation-1"
                items-per-page="10"
                @update:options="options = $event"
            >
              <template v-slot:top>
                <v-toolbar flat>
                  <v-toolbar-title style="text-align: left">Dlivrd Onboard Drivers</v-toolbar-title>
                </v-toolbar>
              </template>
              <template v-slot:expanded-row="{ columns, item }">
                <tr>
                  <td :colspan="columns.length">
                    <v-card  style="background-color: #8de867;text-align: right">
                      {{ item.raw.name }}
                      <v-btn v-if="item.raw.status == 'blocked'" @click="statusChange(false,item.raw.email)" class="button_item">Unblock</v-btn>
                      <v-btn v-if="item.raw.status != 'blocked'" @click="statusChange(true,item.raw.email)" class="button_item">Block</v-btn>
                      <!--                      <v-btn class="button_item">Resend Password</v-btn>-->
                    </v-card>
                  </td>
                </tr>
              </template>
            </v-data-table-server>
          </v-card>
        </v-main>
      </v-layout>
    </v-container>
  </div>
</template>


<style svcc>
.search_field{
  border: 1px solid #8de867 !important;
  background-color: #8de867 !important;
  border-radius: 5px !important;


  font-size: 15px;
  margin: 10px;
}
.loading_bar{
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  top:50%;
  z-index: 100;
  text-align: center;
}
.button_item{
  margin: 8px;
}
.h-100vh {
  height: 100vh;
}
.filter_block{
  text-align: left;
  margin-right: 4px;
}
.filter_block_sub{
  margin: 5px;
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
.v-navigation-drawer{
  top: 50px !important;
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
.top_bar_title{
  text-align-last:left;
  height: 50px;
}

.v-toolbar__content {
  height: 50px !important;
}

.v-text-field--solo.inputTextField_style, .v-input__slot.inputTextField_style{
  border: 1px solid #8de867 !important;
  background-color: #8de867 !important;
  border-radius: 5px !important;

}
.v-data-table__td{
  font-size: .80em;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
