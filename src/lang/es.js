/**
 * Spanish translate
 * Marc Garcia Torrent - https://github.com/mgarcia96
 * @type Object
 */
const es = {
  btn: {
    about: 'Acerca de',
    back: 'Atras',
    cancel: 'Cancelar',
    clear: 'Limpiar',
    copy: 'Copiar',
    cut: 'Cortar',
    delete: 'Eliminar',
    edit: 'Editar',
    forward: 'Siguiente',
    folder: 'Nueva carpeta',
    file: 'Crear archivo',
    fullScreen: 'Pantalla completa',
    grid: 'Cuadrícula',
    paste: 'Pegar',
    refresh: 'Actualizar',
    submit: 'Guardar',
    table: 'Tabla',
    upload: 'Subir',
    uploadSelect: 'Seleccionar archivos',
    hidden: ' Archivos ocultos',
  },
  clipboard: {
    actionType: 'Tipo',
    copy: 'Copiar',
    cut: 'Cortar',
    none: 'Nada seleccionado',
    title: 'Portapapeles',
  },
  contextMenu: {
    copy: 'Copiar',
    cut: 'Cortar',
    delete: 'Eliminar',
    download: 'Descargar',
    info: 'Seleccionar:',
    open: 'Abrir',
    paste: 'Pegar',
    properties: 'Propiedades',
    rename: 'Renombrar',
    select: 'Seleccionar',
    view: 'Vista',
    zip: 'Zip',
    unzip: 'Unzip',
    edit: 'Editar',
    audioPlay: 'Play',
    videoPlay: 'Play',
  },
  info: {
    directories: 'Carpetas:',
    files: 'Archivos:',
    selected: 'Seleccionar:',
    selectedSize: 'Tamaño archivos:',
    size: 'Tamaño archivos:',
  },
  manager: {
    table: {
      date: 'Fecha',
      folder: 'Carpeta',
      name: 'Nombre',
      size: 'Tamaño',
      type: 'Tipo',
    },
  },
  modal: {
    about: {
      developer: 'Developer',
      name: 'Laravel File Manager',
      title: 'About',
      version: 'Version',
    },
    delete: {
      noSelected: 'Nada seleccionado',
      title: 'Eliminar',
    },
    newFile: {
      fieldName: 'Nombre del archivo',
      fieldFeedback: 'El archivo ya existe',
      title: 'Crear nuevo archivo',
    },
    newFolder: {
      fieldName: 'Nombre de la carpeta',
      fieldFeedback: 'La carpeta ya existe',
      title: 'Crear nueva carpeta',
    },
    preview: {
      title: 'Preview',
    },
    properties: {
      disk: 'Disk',
      modified: 'Modificado',
      name: 'Nombre',
      path: 'Path',
      size: 'Tamaño',
      title: 'Propiedades',
      type: 'Tipo',
      url: 'URL',
      access: 'Acceso',
      access_0: 'Access denied',
      access_1: 'Only Read',
      access_2: 'Read and Write',
    },
    rename: {
      directoryExist: 'Ya existe el directorio',
      fieldName: 'Nuevo nombre',
      fieldFeedback: 'Nombre invalido',
      fileExist: 'Ya existe el archivo',
      title: 'Renombrar',
    },
    status: {
      noErrors: 'No errors!',
      title: 'Status',
    },
    upload: {
      ifExist: 'Si el archivo ya existe:',
      noSelected: 'No has seleccionado nada!',
      overwrite: 'Sobreescribir',
      selected: 'Seleccionar:',
      size: 'Size:',
      skip: 'Omitir',
      title: 'Subir archivos',
    },
    editor: {
      title: 'Editor',
    },
    audioPlayer: {
      title: 'Audio player',
    },
    videoPlayer: {
      title: 'Video player',
    },
    zip: {
      title: 'Crear archivo',
      fieldName: 'Nombre del archivo',
      fieldFeedback: 'Ya existe!',
    },
    unzip: {
      title: 'Descomprimir',
      fieldName: 'Nombre del directorio',
      fieldRadioName: 'Extraer en:',
      fieldRadio1: 'Carpeta actual',
      fieldRadio2: 'Nueva carpeta',
      fieldFeedback: 'Carpeta existente!',
      warning: 'Attention! If the names match, the files will be overwritten!',
    },
    cropper: {
      title: 'Cropping',
      apply: 'Aceptar',
      reset: 'Reset',
      save: 'Guardar',
    },
  },
  notifications: {
    cutToClipboard: 'Copiado!',
    copyToClipboard: 'Copiado!',
  },
  // todo - need to translate
  response: {
    noConfig: 'Configuración no encontrada!',
    notFound: 'Extraviado!',
    diskNotFound: 'Disco no encontrado!',
    pathNotFound: 'Camino no encontrado!',
    diskSelected: 'Disco seleccionado!',
    // files
    fileExist: 'El archivo ya existe!',
    fileCreated: 'Archivo creado!',
    fileUpdated: 'Archivo actualizado!',
    fileNotFound: 'Archivo no encontrado!',
    // directories
    dirExist: 'El directorio ya existe!',
    dirCreated: 'Directorio creado!',
    dirNotFound: 'Directorio no encontrado',
    // actions
    uploaded: 'Todos los archivos cargados!',
    notAllUploaded: 'Algunos archivos no fueron subidos!',
    delNotFound: 'Algunos artículos no fueron encontrados!',
    deleted: 'Eliminado!',
    renamed: 'Renombrado!',
    copied: 'Copiado exitosamente!',
    // zip
    zipError: 'Error al crear archivo!',
    // acl
    aclError: 'Acceso denegado!',
  },
};

export default es;
