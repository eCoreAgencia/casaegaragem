class Menu {
  constructor() {
    this.vtexMenu = $('#top-menu .menu-departamento');
    this.menu = $('.header__menu .navbar');
    this.eachItem();
  }



  eachItem() {
    let self = this;
    this.vtexMenu.find('h3').each(function () {
      self.renderItem($(this));
    })
  }

  renderItem(item) {
    const newItem = {
      name: item.find('a').text(),
      href: item.find('a').attr('href'),
      children: item.next('ul'),
    }
    const newItemHtml = `<div class="navbar-item${ newItem.children ? ' has-dropdown' : '' } is-hoverable">
				<a class="navbar-link" href="${newItem.href}">${newItem.name}</a>
				${ newItem.children ? this.renderChildren(newItem.children) : '' }
		</div>`;
    console.log(newItemHtml);
    this.menu.append(newItemHtml);


  }

  renderChildren(children) {
    console.log(children.find('li'));
    let newChildren = '';

    children.find('li').each(function () {
      newChildren += `<a href="${$('a', this).attr('href')}" class="navbar-item">
			${$('a', this).text()}
		  </a>`;
    });
    if (children) {
      newChildren = `<div class="navbar-dropdown">${newChildren}</div>`
    }
    return newChildren;
  }


}

window.menu = new Menu();


$(document).ready(function () {
  $('.icon-menu').on('click', function () {
    $('.menu--modal').addClass('is-active');
  })

  $('.menu--modal__overlay').on('click', function (e) {
    $('.menu--modal').removeClass('is-active');
  })


  $('.has-dropdown .navbar-link').on('click', function (e) {
    e.preventDefault();

    $('.submenu--todo').addClass('is-open');

  });
})
