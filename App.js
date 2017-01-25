import React from 'react';
import { Grid,Row,Col } from 'react-bootstrap';
import Header from './Header.js';
import Items from './Items.js';
import SearchBox from './SearchBox.js';
import Filter from './Filter.js';
import http from 'axios';
import lodash from 'lodash';
import Loader from 'react-loader';

var allProduct = [];

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      imageObject:[],
      checkLow:false,
      checkHigh:false,
      checkDate:false,
      loading:false
    }
    this.handleChangeResponse = this.handleChangeResponse.bind(this);
    this.searchResponse = this.searchResponse.bind(this);
    this.searchByIconResponse = this.searchByIconResponse.bind(this);
    this.radioCheckResponse = this.radioCheckResponse.bind(this);
    this.radioCheckResponseAnnyang = this.radioCheckResponseAnnyang.bind(this);
    this.searchItem = this.searchItem.bind(this);
    this.searchComplete = this.searchComplete.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
    this.playSong = this.playSong.bind(this);
    this.checkout = this.checkout.bind(this);
    this.continue = this.continue.bind(this)
  }
  radioCheckResponseAnnyang(price) {
    if(price==='low to high'){
      document.getElementById('low_to_high').checked = true;
      var lowPrice = _.sortBy(this.state.imageObject, function(o) { return parseInt(o.price); });
      this.setState({
        imageObject:lowPrice,
        checkLow:true,
        checkHigh:false,
        checkDate:false
      })
    }
    else if(price==='high to low'){
      document.getElementById('high_to_low').checked = true;
      var highPrice = (_.sortBy(this.state.imageObject, function(o) { return parseInt(o.price); })).reverse();
      this.setState({
        imageObject:highPrice,
        checkLow:false,
        checkHigh:true,
        checkDate:false
      })
    }
    else if(price==='date'){
      document.getElementById('date').checked = true;
      var date = _.sortBy(this.state.imageObject, function(o) { return parseInt(o.date); });
      this.setState({
        imageObject:date,
        checkLow:false,
        checkHigh:false,
        checkDate:true
      })
    }
  }
  searchItem(typedText) {
    console.log(typedText)
    document.getElementById('searchId').value = typedText + '';
  }
  searchComplete() {
    this.searchByIconResponse(document.getElementById('searchId').value)
  }
  clearSearch() {
    document.getElementById('searchId').value = '';
    this.searchByIconResponse(' ');
  }
  playSong(song) {
     $.ajax({
      url: 'https://api.spotify.com/v1/search',
      data: {
        q: song,
        type: 'track'
      },
      success: function(data){
        console.log('success', data);
        /*
        for(x in data.artists.items){
          var artist = data.artists.items[x];
          $('ul').append("<li>"+ artist.name +"</li>");
        }
        */
        let audio = new Audio(data.tracks.items[0].preview_url);
        audio.play();

      },
      error: function(data){
        console.log('error', data);
      }
    })
  }
  checkout(number) {
    document.getElementById(number-1).click();
  }
  closeCheckout() {
    document.getElementById('close_checkout').click();
  }
  continue() {
    document.getElementById('payment_button').click();
  }
  componentDidMount () {
    this.loadData();
    if(annyang) {
      console.log('I find annyang');
      var commands = {
        'Filter by *price' : this.radioCheckResponseAnnyang,
        'show me *item' : this.searchItem,
        'search' : this.searchComplete,
        'clear search' : this.clearSearch,
        'play *song song': this.playSong,
        'check out number *number': this.checkout,
        'cancel check out': this.closeCheckout,
        'continue to pay' : this.continue,
        'Bank name *bank' : function(bank) {document.getElementById('bank').value = bank + ''},
        'card number *card' : function(card) {document.getElementById('card').value = card + ''},
        'pin number *pin' : function(pin) {document.getElementById('pin').value = pin + ''},
        'pay now': function() {document.getElementById('payment').click();},
        'Search *term in google' : function(term) {window.open('https://www.google.com/#q='+term, '_blank')},
      }

      annyang.addCommands(commands);
      SpeechKITT.setStartCommand(annyang.start);
      annyang.setLanguage('en-IN');
      SpeechKITT.setSampleCommands(['Filter by *price','show me *item']);
      SpeechKITT.setInstructionsText('Some Commands to try..');
      SpeechKITT.setStartCommand(annyang.start);
      SpeechKITT.setAbortCommand(annyang.abort);
      //SpeechKITT.annyang();
      SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css');
      annyang.debug();
      SpeechKITT.vroom();
  // Start listening. You can call this here, or attach this call to an event, button, etc.
     // annyang.start({ autoRestart: true, continuous: false });;
    }
    else{
      console.log('Annyang is not supported')
    }
  }
  loadData () {
    http.get('./public/Product.json')
    .then((reponse)=>{
      allProduct = reponse.data.images;
      setTimeout(()=>{ // Loader when data size will be huge. Here given a 3 sec timeout.
        this.setState({
        imageObject : allProduct,
        checkLow:false,
        checkHigh:false,
        checkDate:false,
        loading:true
      })
      },1200)

    })
  }
  searchByIconResponse (data) {
    if(data.length === 1){ // when users deletes the text by backspace
      this.setState({
          imageObject : allProduct,
      })
    }
    var searchItem = [];
      var pattern = new RegExp(data.toString(),'gi');
      allProduct.map((option,i)=>{
         if(allProduct[i].description.match(pattern) !== null)
           searchItem.push(allProduct[i])
      })

      /* To check what radio button is clicked */
      if(this.state.checkLow) {
        var lowPrice = _.sortBy(searchItem, function(o) { return parseInt(o.price); });
        this.setState({
          imageObject:lowPrice
        })
      }
      else if(this.state.checkHigh) {
        var highPrice = (_.sortBy(searchItem, function(o) { return parseInt(o.price); })).reverse();
        this.setState({
          imageObject:highPrice
        })
      }
      else if(this.state.date) {
         var date = _.sortBy(searchItem, function(o) { return parseInt(o.date); });
         this.setState({
          imageObject:date
        })
      }
      else{
        this.setState({
        imageObject : searchItem
        })
      }
      /**/
  }
  handleChangeResponse (data) {
    if(data.length === 0) // when user selects the whole text and delete
      this.setState({
        imageObject : allProduct,
      })
   }
  searchResponse (event,data) {
    if(event.keyCode === 13){ //check on enter method
      event.preventDefault();
      this.searchByIconResponse(data);
    }
  }
  radioCheckResponse (data) {
    if(data.value==='low'){
      var lowPrice = _.sortBy(this.state.imageObject, function(o) { return parseInt(o.price); });
      this.setState({
        imageObject:lowPrice,
        checkLow:true,
        checkHigh:false,
        checkDate:false
      })
    }
    else if(data.value==='high'){
      var highPrice = (_.sortBy(this.state.imageObject, function(o) { return parseInt(o.price); })).reverse();
      this.setState({
        imageObject:highPrice,
        checkLow:false,
        checkHigh:true,
        checkDate:false
      })
    }
    else if(data.value==='date'){
      var date = _.sortBy(this.state.imageObject, function(o) { return parseInt(o.date); });
      this.setState({
        imageObject:date,
        checkLow:false,
        checkHigh:false,
        checkDate:true
      })
    }
  }
   render() {
    const imageObject = this.state.imageObject || [];
    const { checkLow,checkHigh,checkDate } = this.state;
      return (
        <div>
          <Loader loaded={this.state.loading} lines={13} length={20} width={10} radius={30}
          corners={1} rotate={0} direction={1} color="#000" speed={1}
          trail={60} shadow={false} hwaccel={false} className="spinner"
          zIndex={2e9} top="50%" left="50%" scale={1.00}
          loadedClassName="loadedContent" />
          <Header />
          <SearchBox
            handleChangeResponse={this.handleChangeResponse}
            searchResponse={this.searchResponse}
            searchByIconResponse={this.searchByIconResponse} />
          <Filter radioCheckResponse={this.radioCheckResponse} {...this.state}/>
          <Items products={this.state.imageObject} />
        </div>);
    }
  }

export default App;
