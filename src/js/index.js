const menuIcon = document.querySelector('.navigation__menu-icon');
const closeMenu = document.querySelector('.navigation__close-menu-icon');
const panel = document.querySelector('.navigation__panel-mobile');
document.body.addEventListener('click', event => {
    if (event.target === menuIcon) {
        menuIcon.classList.remove('navigation__menu-icon--active');
        closeMenu.classList.add('navigation__close-menu-icon--active');
        panel.classList.add('navigation__panel-mobile--active');
    }
    else if (event.target === closeMenu || event.target.tagName !== 'A') {
        closeMenu.classList.remove('navigation__close-menu-icon--active');
        panel.classList.remove('navigation__panel-mobile--active');
        menuIcon.classList.add('navigation__menu-icon--active');
    }
});
