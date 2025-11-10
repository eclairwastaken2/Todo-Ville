const modal = document.getElementById('entryModal');
const openModalBtn = document.getElementById('openModalBtn'); 
const closeModal = document.getElementById('closeModal'); 
const modalWarning = document.getElementById('modalWarning');

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block'; 
}); 

closeModal.addEventListener('click', () => {
    modal.style.display = 'none'; 
    modalWarning.innerHTML = "";
})

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none'; 
        modalWarning.innerHTML = ""; 
    }
})
