class Filter {
  constructor(){
    this.menu = document.querySelector('.logo ');
    this.init();
  }

  init(){
    if(this.isExist(this.menu)){
      console.log(this.menu);
    }else{
      console.log('Não existe');
    }
  }

  isExist(e){
    const exist = (e == null) ? false : true;
    return exist;
  }
}

//window.filter = new Filter();
