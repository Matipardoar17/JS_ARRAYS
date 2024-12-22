let tareas = [
  { id: 1, nombre: 'ir a la universidad', completa: false },
  { id: 2, nombre: 'comprar alimento para las mascotas', completa: false },
  { id: 3, nombre: 'ir a taller de violin', completa: false }
];

const listaTareas = document.getElementById('listaTareas');
const inputNuevaTarea = document.getElementById('nuevaTarea');
      const totalTareasElement = document.getElementById('totalTareas');
const tareasHechasElement = document.getElementById('tareasHechas');

const añadirTarea = () => {
  const nuevaTareaTexto = inputNuevaTarea.value.trim();
  if (nuevaTareaTexto === "") return;

  const nuevaTarea = {
      id: tareas.length > 0 ? tareas[tareas.length - 1].id + 1 : 1, 
      nombre: nuevaTareaTexto,
      completa: false
  };
  tareas.push(nuevaTarea);
  inputNuevaTarea.value = "";
  renderizar();
};

const cambiarStatus = (id) => {
  tareas = tareas.map(tarea =>
      tarea.id === id ? { ...tarea, completa: !tarea.completa } : tarea
  );
  renderizar();
};

const eliminarTarea = (id) => {
  tareas = tareas.filter(tarea => tarea.id !== id);
  renderizar();
};

const renderizar = () => {
  listaTareas.innerHTML = '';

  tareas.forEach(tarea => {
      const li = document.createElement('li');
      li.className = "caja";

      const idParrafo = document.createElement('p');
      idParrafo.textContent = tarea.id;
      li.appendChild(idParrafo);

      const spanTarea = document.createElement('span');
      spanTarea.className = tarea.completa ? 'completa' : '';
      spanTarea.textContent = tarea.nombre;
      spanTarea.addEventListener('click', () => cambiarStatus(tarea.id)); 
      li.appendChild(spanTarea);

      const botonEliminar = document.createElement('button');
      botonEliminar.textContent = "Eliminar";
      botonEliminar.addEventListener('click', () => eliminarTarea(tarea.id)); 
      li.appendChild(botonEliminar);

      listaTareas.appendChild(li);
  });
  actualizarContadores();
};

const actualizarContadores = () => {
  const tareasCompletadas = tareas.filter(tarea => tarea.completa).length;
  totalTareasElement.textContent = `Total tareas: ${tareas.length}`;
  tareasHechasElement.textContent = `Tareas realizadas: ${tareasCompletadas}`;
};

renderizar();
