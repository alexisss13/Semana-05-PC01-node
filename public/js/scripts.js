/* global bootstrap, showToast */

// --- ESTADO Y SELECTORES GLOBALES DE UI ---

let allToys = []
let currentPage = 1
let itemsPerPage = 5

const toyTableBody = document.querySelector('#toyTable tbody')
const paginationControls = document.getElementById('pagination-controls')
const toastContainer = document.querySelector('.toast-container')
const darkModeToggle = document.getElementById('darkModeToggle')

// --- LÓGICA DEL MODO OSCURO ---
const applyTheme = (theme) => {
  document.body.classList.toggle('dark-mode', theme === 'dark')
  if (darkModeToggle) {
    darkModeToggle.checked = theme === 'dark'
  }
}

if (darkModeToggle) {
  darkModeToggle.addEventListener('change', () => {
    const newTheme = darkModeToggle.checked ? 'dark' : 'light'
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  })
}
applyTheme(localStorage.getItem('theme') || 'light')

// --- NOTIFICACIONES TOAST ---
const showToast = (message, type = 'success') => {
  if (!toastContainer) return
  const toastId = `toast-${Date.now()}`
  const toastIcon =
    type === 'success' ? 'check-circle-fill' : 'exclamation-triangle-fill'
  const toastHTML = `
        <div id="${toastId}" class="toast align-items-center text-white bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="d-flex">
                <div class="toast-body"><i class="bi bi-${toastIcon} me-2"></i>${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>`
  toastContainer.insertAdjacentHTML('beforeend', toastHTML)
  const toastElement = document.getElementById(toastId)
  const toast = new bootstrap.Toast(toastElement, { delay: 3000 })
  toast.show()
  toastElement.addEventListener('hidden.bs.toast', () => toastElement.remove())
}

// --- LÓGICA DE RENDERIZADO Y PAGINACIÓN ---
const renderTable = () => {
  if (!toyTableBody) return
  toyTableBody.innerHTML = ''

  updateStats()

  if (allToys.length === 0) {
    toyTableBody.innerHTML = `<tr><td colspan="5" class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
            <h4>No hay juguetes en tu inventario</h4><p>Usa el formulario para añadir tu primer juguete.</p></td></tr>`
    paginationControls.innerHTML = ''
    return
  }

  const start = (currentPage - 1) * itemsPerPage
  const end = start + itemsPerPage
  const paginatedToys = allToys.slice(start, end)

  paginatedToys.forEach((toy) => {
    const row = document.createElement('tr')
    row.dataset.id = toy._id
    row.innerHTML = `
            <td><strong>${toy.nombre}</strong><br><small class="text-muted">${toy.descripcion}</small></td>
            
            <td><span class="badge bg-secondary bg-opacity-25 text-dark-emphasis">${toy.categoria}</span></td>
            
            <td>$${parseFloat(toy.precio).toFixed(2)}</td>
            <td>${toy.stock}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-primary edit-btn" title="Editar"><i class="bi bi-pencil-fill"></i></button>
                <button class="btn btn-sm btn-outline-danger delete-btn" title="Eliminar"><i class="bi bi-trash-fill"></i></button>
            </td>`
    toyTableBody.appendChild(row)
  })
  renderPaginationControls()
}

const renderPaginationControls = () => {
  if (!paginationControls) return
  const totalPages = Math.ceil(allToys.length / itemsPerPage)
  if (totalPages <= 1) {
    paginationControls.innerHTML = ''
    return
  }

  paginationControls.innerHTML = `
        <div class="d-flex align-items-center gap-2">
            <label for="itemsPerPageSelect" class="form-label mb-0 text-muted"><small>Filas:</small></label>
            <select id="itemsPerPageSelect" class="form-select form-select-sm">
                <option value="5" ${itemsPerPage === 5 ? 'selected' : ''}>5</option>
                <option value="10" ${itemsPerPage === 10 ? 'selected' : ''}>10</option>
                <option value="25" ${itemsPerPage === 25 ? 'selected' : ''}>25</option>
            </select>
        </div>
        <span class="text-muted"><small>Página ${currentPage} de ${totalPages}</small></span>
        <ul class="pagination pagination-sm mb-0">
            <li class="page-item ${currentPage === 1 ? 'disabled' : ''}"><a class="page-link" href="#" id="prev-page">Anterior</a></li>
            <li class="page-item ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}"><a class="page-link" href="#" id="next-page">Siguiente</a></li>
        </ul>`

  document
    .getElementById('itemsPerPageSelect')
    .addEventListener('change', (e) => {
      itemsPerPage = parseInt(e.target.value)
      currentPage = 1
      renderTable()
    })
  document.getElementById('prev-page').addEventListener('click', (e) => {
    e.preventDefault()
    if (currentPage > 1) {
      currentPage--
      renderTable()
    }
  })
  document.getElementById('next-page').addEventListener('click', (e) => {
    e.preventDefault()
    if (currentPage < totalPages) {
      currentPage++
      renderTable()
    }
  })
}

const updateStats = () => {
  document.getElementById('total-juguetes').innerText = allToys.length
  document.getElementById('total-stock').innerText = allToys.reduce(
    (sum, toy) => sum + parseInt(toy.stock),
    0
  )
  const valorInventario = allToys.reduce(
    (sum, toy) => sum + parseFloat(toy.precio) * parseInt(toy.stock),
    0
  )
  document.getElementById('valor-inventario').innerText =
    `$${valorInventario.toFixed(2)}`
  let topCategoria = '-'
  if (allToys.length > 0) {
    const categoryCounts = allToys.reduce((acc, toy) => {
      acc[toy.categoria] = (acc[toy.categoria] || 0) + 1
      return acc
    }, {})
    topCategoria = Object.keys(categoryCounts).reduce((a, b) =>
      categoryCounts[a] > categoryCounts[b] ? a : b
    )
  }
  document.getElementById('top-categoria').innerText = topCategoria
}
