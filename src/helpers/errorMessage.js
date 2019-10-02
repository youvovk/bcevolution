export const errorMessage = (element, message) => {

    let form = element.parentElement.parentElement.parentElement;
    let error = form.querySelector('.error');
    error.classList.add('active');
    let offsetY = element.offsetTop + element.getBoundingClientRect().height + 5;
    let offsetX = element.offsetLeft;
    error.style.top = offsetY + 'px';
    error.style.left = offsetX + 'px';
    error.lastChild.innerHTML = message;
    
    
    setTimeout(() => {
        document.addEventListener('resize', handleListener);
        document.addEventListener('click', handleListener);  
        document.addEventListener('mouseout', handleListener);  
    }, 100)

}

const handleListener = () => {

    let errors = [...document.querySelectorAll('.error')];

    errors.map(error => {
        error.classList.remove('active');
    })

    document.removeEventListener('click', handleListener);
    document.removeEventListener('resize', handleListener);
    document.removeEventListener('mouseout', handleListener);

}