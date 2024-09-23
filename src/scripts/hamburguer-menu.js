const menuLabel = document.querySelector("#x-menu");
const menuContainer = document.querySelector(".hamburguer-nav");
const menuListItems = menuContainer.querySelectorAll(".hamburguer-nav_list_item a");

function checkMenu() {
  if(menuLabel.checked) {
    menuContainer.style.transform = "translateY(0)";
  } else {
    menuContainer.style.transform = "translateY(-100vh)";
  }
}

menuLabel.onclick = checkMenu;

menuListItems.forEach(links => {
  links.onclick = () => {
    menuLabel.checked = false;
    checkMenu();
  }
});
