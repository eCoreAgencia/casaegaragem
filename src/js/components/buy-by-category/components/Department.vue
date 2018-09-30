<template>
  <div :id="slug" class="buy-by-category" :data-id="id">
    <div class="category category__card">
      <div class="category__card-header">
        <div class="category__card-media" :style="banner">
        </div>
        <div class="category__card-info">
          <span class="category__name">{{ titulo }}</span>
          <a class="category__link" :href="url">Ver todos</a>
        </div>
      </div>

      <div class="category__menu">
        <ul class="menu-list">
          <Category v-for="category in categories" @onButtonClick="getProducts" :key="category.id" :name="category.name" :url="category.url" :id="category.id"/>
        </ul>
      </div>
    </div>
    <div class="shelf shelf__carousel--category">
      <div class="spinner">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import Category from './Category.vue';
  import vtexRequest from '../../../modules/vtexRequest';
  import { setTimeout } from 'timers';
  import { slugify } from '../../../utils';

  export default {
    props: {
      id: Number,
      titulo: String,
      url: String,
      categories: Array
    },
    computed: {
      slug: function(){
        let slug = slugify(this.titulo);
        return slug;
      },
      banner: function(){
        let banner = `background-image: url('/arquivos/banner-${ slugify(this.titulo) }.jpg')`;

        return banner;
      }
    },
    mounted(){
      const shelf__prev = `<button type='button' class='slick-prev shelf__button'><svg data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.96 62.45"><path fill="#9e9e9e" d="M0 32.47l30.24 29.98 2.62-2.49L4.19 31.23 32.95 2.49 30.22 0 0 29.98v2.49z"/></svg></button>`
      const shelf__next = `<button type='button' class='slick-next shelf__button'><svg data-name="Camada 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.96 62.45"><path fill="#9e9e9e" d="M32.95 29.98L2.72 0 .1 2.49l28.66 28.74L0 59.96l2.73 2.49 30.22-29.98v-2.49z"/></svg></button>`

      const api = new vtexRequest();

      const list = $(`.buy-by-category[data-id="${this.id}"] .shelf__carousel--category`);

      const query = `fq=C:${this.id}`;
      const products = api.getProductWithShelfId(query, '65c15678-2bbe-72e0-3aa6-0aa635db2f86')
                        .then(response => {
                          setTimeout(function(){
                            $(window).trigger('productFinished');
                          }, 1000)
                          list.html(response)
                          });


      $(`.buy-by-category[data-id="${this.id}"] .category__card .menu-list`).each(function () {
        if ($('li', this).length > 5 && !$(this).hasClass('slick-initialized')) {
          $(this).slick({
            vertical: true,
            slidesToShow: 5,
            infinite: false,
            prevArrow: shelf__prev,
            nextArrow:shelf__next
          })
        }
      })

      //renderProducts();






    },
    destroyed(){

    },
    data() {
      return {

      }
    },
    methods: {
      getProducts(id){

        const api = new vtexRequest();

        const list = $(`.buy-by-category[data-id="${this.id}"] .shelf__carousel--category`);
        const spinner = `
          <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
          </div>`

        list.html(spinner);

        const query = `fq=C:/${this.id}/${id}/`;

        const products = api.getProductWithShelfId(query, '65c15678-2bbe-72e0-3aa6-0aa635db2f86')
          .then(response => {
            if(response) {
              setTimeout(function(){
                $(window).trigger('productFinished');
              }, 1000)
              list.html(response)
            } else {
              list.html('<span class="">Não há produtos nesta categoria</span>')
            }
          });
      }



    },
    components: {
      Category
    }

  }
</script>


