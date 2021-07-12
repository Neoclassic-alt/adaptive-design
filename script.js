function ready(){
    const asideIcon = document.querySelector('.aside__button')
    const aside = document.querySelector('.aside')
    // прокрутка input
    const sidebar = document.querySelector('.sidebar')
    const sidebarTitle = document.querySelector('.sidebar__title')
    const sidebarSearch = document.querySelector('.sidebar__search')
    const searchIcon = document.querySelector('.search__icon')
    const content = document.querySelector('.content')

    asideIcon.onclick = function(){
        aside.classList.toggle('aside_open')
        asideIcon.classList.toggle('close-icon_active')
    }
    if (document.documentElement.clientWidth < 1440){
        window.onscroll = function(){
            if (pageYOffset < 32){
                searchIcon.style.display = 'block'
                searchIcon.style.opacity = 1 - (1 / 32) * pageYOffset
            }
            if (pageYOffset > 32){
                searchIcon.style.display = 'none'
            }
            if (pageYOffset < 64){
                sidebarSearch.style.width = `calc(100% - ${40 + 40 / 64 * pageYOffset}px)`
                sidebar.style.position = 'static'
                sidebar.style.paddingTop = '37px'
                sidebarTitle.style.display = 'block'
                content.style.marginTop = '0'
            }
            if (pageYOffset >= 64){
                sidebarSearch.style.width = 'calc(100% - 80px)'
                sidebar.style.position = 'sticky'
                sidebar.style.paddingTop = '6px'
                sidebarTitle.style.display = 'none'
                content.style.marginTop = '60px'
            }
        }
    } else {
        sidebar.style.position = 'sticky'
    }

    const asideIcons = document.querySelectorAll('.aside__icon')
    const asideMenu = document.querySelector('.aside__list')

    let i = 0
    for (let asideItem of asideMenu.children){
        asideItem.dataset.position = i
        i++
    }

    asideMenu.onmouseover = function(event){
        let target = event.target
        if (target && target.closest('.menu__item')){
            const menuItem = target.closest('.menu__item')
            const position = menuItem.dataset.position
            const className = asideIcons[position].children[0].className
            let imageName = className.split('_')
            imageName = imageName[imageName.length - 1] // из класса выводится название изображения
            asideIcons[position].children[0].style.backgroundImage = `url("icons/active/${imageName}.svg")`
            //menuItem.children[0].style.color = '#34ABE0'
        }
    }

    asideMenu.onmouseout = function(){
        for (let asideIcon of asideIcons){
            let className = asideIcon.children[0].className
            let imageName = className.split('_')
            imageName = imageName[imageName.length - 1] // из класса выводится название изображения
            asideIcon.children[0].style.backgroundImage = `url("icons/default/${imageName}.svg")`
        }
    }
}

document.addEventListener("DOMContentLoaded", ready)