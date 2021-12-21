import {DBType, JfCondition} from '../resources/classes'
import {k} from './k'

const assets = k.routes.backEnd.assets

export const l = {
  misc: {
    routes: k.routes,
    slug: new DBType('Slug', 'stores.slug', 'string'),
    csv: `${assets}images/admin/ic-csv.svg`,
    zip: `${assets}images/admin/ic-zip.svg`,
    pdf: `${assets}images/admin/ic-pdf.svg`,
    upload: `${assets}images/admin/ic-upload.svg`,
    loading: `${assets}images/admin/ic-loading.svg`,
    pageLimit: [
      new JfCondition('5', 5),
      new JfCondition('10', 10),
      new JfCondition('50', 50),
      new JfCondition('100', 100),
      new JfCondition('Todos', -1),
    ],
  },
  /* -------------------------------------------------------------------------- */
  /* System                                                                     */
  /* -------------------------------------------------------------------------- */

  service: {
    tablePK: 'id',
    tableName: 'services',
    ownName: 'Servicio',
    ownNamePlural: 'Servicios',
    id: new DBType('#', 'services.id', 'number'),
    name: new DBType('Nombre', 'services.name', 'string'),
    createdBy: new DBType('Createdby', 'services.createdBy', 'number'),
    updatedBy: new DBType('Updatedby', 'services.updatedBy', 'number'),
    created_at: new DBType('Created_At', 'services.created_at', 'date'),
    updated_at: new DBType('Updated_At', 'services.updated_at', 'date'),
    deleted_at: new DBType('Deleted_At', 'services.deleted_at', 'date'),

    clients_services: new DBType(`Client #`, 'client.clients_services', 'number'),
    clientName: new DBType(`Client`, 'clientName', 'string', true, false),
  },
  vehicle: {
    tablePK: 'id',
    tableName: 'vehicles',
    ownName: 'Vehículo',
    ownNamePlural: 'Vehículos',
    id: new DBType('#', 'vehicles.id', 'number'),
    volume: new DBType('Volumen', 'vehicles.volume', 'string'),
    plate: new DBType('Placa', 'vehicles.plate', 'string'),
    color: new DBType('Color', 'vehicles.color', 'string'),
    brand: new DBType('Marca', 'vehicles.brand', 'string'),
    driver: new DBType('Conductor', 'vehicles.driver', 'string'),
    // createdBy: new DBType('Createdby', 'vehicles.createdBy', 'number'),
    // updatedBy: new DBType('Updatedby', 'vehicles.updatedBy', 'number'),
    // created_at: new DBType('Created_At', 'vehicles.created_at', 'date'),
    // updated_at: new DBType('Updated_At', 'vehicles.updated_at', 'date'),
    // deleted_at: new DBType('Deleted_At', 'vehicles.deleted_at', 'date'),

    vehicle_id: new DBType(`Journey #`, 'journey.vehicle_id', 'number'),
    journeyName: new DBType(`Journey`, 'journeyName', 'string', true, false),
  },
  incident: {
    tablePK: 'id',
    tableName: 'incidents',
    ownName: 'Incidente',
    ownNamePlural: 'Incidentes',
    id: new DBType('#', 'incidents.id', 'number'),
    name: new DBType('Nombre', 'incidents.name', 'string'),
    // createdBy: new DBType('Createdby', 'incidents.createdBy', 'number'),
    // updatedBy: new DBType('Updatedby', 'incidents.updatedBy', 'number'),
    // created_at: new DBType('Created_At', 'incidents.created_at', 'date'),
    // updated_at: new DBType('Updated_At', 'incidents.updated_at', 'date'),
    // deleted_at: new DBType('Deleted_At', 'incidents.deleted_at', 'date'),

    // incident_id: new DBType(`Requestsincident #`, 'requestsIncident.incident_id', 'number'),
    // requestsIncidentName: new DBType(`Requestsincident`, 'requestsIncidentName', 'string', true, false),
  },
  config: {
    tablePK: 'id',
    tableName: 'configs',
    ownName: 'Configuraciones',
    ownNamePlural: 'Configs',
    id: new DBType('#', 'configs.id', 'number'),
    deliveryOutOfTime: new DBType('Entregas fuera de tiempo', 'configs.deliveryOutOfTime', 'number'),
    timeForEachRequestStatusG: new DBType('Tiempo (verde)', 'configs.timeForEachRequestStatusG', 'number'),
    timeForEachRequestStatusY: new DBType('Tiempo (amarillo)', 'configs.timeForEachRequestStatusY', 'number'),
    timeForEachRequestStatusR: new DBType('Tiempo (rojo)', 'configs.timeForEachRequestStatusR', 'number'),
    deliveryOutOfTimeExpress: new DBType('Entregas fuera de tiempo', 'configs.deliveryOutOfTimeExpress', 'number'),
    timeForEachRequestStatusExpressG: new DBType(
      'Tiempo (verde)',
      'configs.timeForEachRequestStatusExpressG',
      'number'
    ),
    timeForEachRequestStatusExpressY: new DBType(
      'Tiempo (amarillo)',
      'configs.timeForEachRequestStatusExpressY',
      'number'
    ),
    timeForEachRequestStatusExpressR: new DBType('Tiempo (rojo)', 'configs.timeForEachRequestStatusExpressR', 'number'),
    createdBy: new DBType('Createdby', 'configs.createdBy', 'number'),
    updatedBy: new DBType('Updatedby', 'configs.updatedBy', 'number'),
    created_at: new DBType('Created_At', 'configs.created_at', 'date'),
    updated_at: new DBType('Updated_At', 'configs.updated_at', 'date'),
  },
  holiday: {
    tablePK: 'holiday',
    tableName: 'holidays',
    ownName: 'Día festivo',
    ownNamePlural: 'Días festivos',
    holiday: new DBType('Día festivo', 'holidays.holiday', 'date'),
  },
  journey: {
    tablePK: 'id',
    tableName: 'journeys',
    ownName: 'Viaje',
    ownNamePlural: 'Viajes',
    id: new DBType('#', 'journeys.id', 'number'),
    vehicle_id: new DBType('Vehículo #', 'journeys.vehicle_id', 'number'),
    person_id: new DBType('Persona #', 'journeys.person_id', 'number'),
    shift: new DBType('Turno', 'journeys.shift', 'number'),
    active: new DBType('Activo', 'journeys.active', 'boolean'),
    createdBy: new DBType('Createdby', 'journeys.createdBy', 'number'),
    updatedBy: new DBType('Updatedby', 'journeys.updatedBy', 'number'),
    created_at: new DBType('Created_At', 'journeys.created_at', 'date'),
    updated_at: new DBType('Updated_At', 'journeys.updated_at', 'date'),
    deleted_at: new DBType('Deleted_At', 'journeys.deleted_at', 'date'),

    // person_id: new DBType(`Authperson #`, 'authPerson.person_id', 'number'),
    authPersonName: new DBType(`Authperson`, 'authPersonName', 'string', true, false),

    // vehicle_id: new DBType(`Vehicle #`, 'vehicle.vehicle_id', 'number'),
    vehicleName: new DBType(`Vehicle`, 'vehicleName', 'string', true, false),

    journeys_people: new DBType(`Authperson #`, 'authPerson.journeys_people', 'number'),
    // authPersonName: new DBType(`Authperson`, 'authPersonName', 'string', true, false),

    journeys_requests: new DBType(`Request #`, 'request.journeys_requests', 'number'),
    requestName: new DBType(`Request`, 'requestName', 'string', true, false),
  },
  /* -------------------------------------------------------------------------- */
  /* Inventory                                                                  */
  /* -------------------------------------------------------------------------- */

  boxType: {
    tablePK: 'id',
    tableName: 'box_types',
    ownName: 'Tipo de caja',
    ownNamePlural: 'Tipos de caja',
    id: new DBType('#', 'box_types.id', 'number'),
    name: new DBType('Nombre', 'box_types.name', 'string'),
    width: new DBType('Ancho', 'box_types.width', 'string'),
    height: new DBType('Alto', 'box_types.height', 'string'),
    depth: new DBType('Profundidad', 'box_types.depth', 'string'),
    // createdBy: new DBType('Createdby', 'box_types.createdBy', 'number'),
    // updatedBy: new DBType('Updatedby', 'box_types.updatedBy', 'number'),
    // created_at: new DBType('Created_At', 'box_types.created_at', 'date'),
    // updated_at: new DBType('Updated_At', 'box_types.updated_at', 'date'),
    // deleted_at: new DBType('Deleted_At', 'box_types.deleted_at', 'date'),

    // box_type_id: new DBType(`Box #`, 'box.box_type_id', 'number'),
    // boxName: new DBType(`Box`, 'boxName', 'string', true, false),

    // box_type_id: new DBType(`Inventorymovement #`, 'inventoryMovement.box_type_id', 'number'),
    // inventoryMovementName: new DBType(`Inventorymovement`, 'inventoryMovementName', 'string', true, false),

    // box_type_id: new DBType(`Zboxesdeleted #`, 'zBoxesDeleted.box_type_id', 'number'),
    // zBoxesDeletedName: new DBType(`Zboxesdeleted`, 'zBoxesDeletedName', 'string', true, false),
  },
  documentType: {
    tablePK: 'id',
    tableName: 'document_types',
    ownName: 'Tipo de documento',
    ownNamePlural: 'Tipos de documentos',
    id: new DBType('#', 'document_types.id', 'number'),
    name: new DBType('Nombre', 'document_types.name', 'string'),
    createdBy: new DBType('Createdby', 'document_types.createdBy', 'number'),
    updatedBy: new DBType('Updatedby', 'document_types.updatedBy', 'number'),
    created_at: new DBType('Created_At', 'document_types.created_at', 'date'),
    updated_at: new DBType('Updated_At', 'document_types.updated_at', 'date'),
    deleted_at: new DBType('Deleted_At', 'document_types.deleted_at', 'date'),

    document_type_id: new DBType(`Document #`, 'documents.document_type_id', 'number'),
    documentName: new DBType(`Document`, 'documentName', 'string', true, false),
  },
  box: {
    tablePK: 'id',
    tableName: 'boxes',
    ownName: 'Caja',
    ownNamePlural: 'Cajas',
    id: new DBType('Nº Caja Ransa', 'boxes.id', 'number'),
    client_id: new DBType('Cliente #', 'boxes.client_id', 'number', true, true),
    branch_id: new DBType('Sucursal #', 'boxes.branch_id', 'number', true, true),
    box_type_id: new DBType('Tipo de caja #', 'boxes.box_type_id', 'number', true, true),

    warehouse_id: new DBType('Almacén #', 'boxes.warehouse_id', 'number', true, true),
    rack_id: new DBType('Mueble #', 'boxes.rack_id', 'number', true, true),
    sector_id: new DBType('Sector #', 'boxes.sector_id', 'number', true, true),
    cubicle_name_id: new DBType('N. cubículo', 'boxes.cubicle_name_id', 'number', true, true),
    floor: new DBType('Piso #', 'boxes.floor', 'number', true, true),

    numBoxClient: new DBType('Nº Caja Cliente', 'boxes.numBoxClient', 'number', true, true),
    codeBar1: new DBType('Cod Barra Ransa', 'boxes.codeBar1', 'string', true, true),
    codeBar2: new DBType('Cod Barra Cliente', 'boxes.codeBar2', 'string', true, true),
    contentReference: new DBType('Observaciones', 'boxes.contentReference', 'string', true, true),
    referenceDocs: new DBType('Referencia Docs', 'boxes.referenceDocs', 'string', true, true),
    retentionDateStart: new DBType('Retención Desde', 'boxes.retentionDateStart', 'date', true, true),
    retentionDateEnd: new DBType('Retención Hasta', 'boxes.retentionDateEnd', 'date', true, true),

    x: new DBType('X', 'boxes.x', 'number', true, true),
    y: new DBType('Y', 'boxes.y', 'number', true, true),
    z: new DBType('Z', 'boxes.z', 'number', true, true),
    request_id: new DBType('Solicitud #', 'boxes.request_id', 'number', true, true),

    branch_name: new DBType('Sucursal', 'boxes.branch_name', 'string', true, false),
    cubicle_id: new DBType('Cubículo #', 'boxes.cubicle_id', 'string', true, false),
    last_request_status_id: new DBType('Estado', 'boxes.last_request_status_id', 'number', true, false),
    internal_request_id: new DBType('Solicitud interna #', 'boxes.internal_request_id', 'number', true, false),
    internal_last_request_status_id: new DBType(
      'Estado solicitud interna',
      'boxes.internal_last_request_status_id',
      'number',
      true,
      false
    ),
    selected: new DBType('Selección', 'boxes.selected', 'boolean', true, false),
    // createdBy: new DBType('Createdby', 'boxes.createdBy', 'number', true, false),
    // updatedBy: new DBType('Updatedby', 'boxes.updatedBy', 'number', true, false),
    // created_at: new DBType('Created_At', 'boxes.created_at', 'date', true, false),
    // updated_at: new DBType('Updated_At', 'boxes.updated_at', 'date', true, false),
    // deleted_at: new DBType('Deleted_At', 'boxes.deleted_at', 'date', true, false),

    // box_type_id: new DBType(`Boxtype #`, 'boxType.box_type_id', 'number'),
    // boxTypeName: new DBType(`Boxtype`, 'boxTypeName', 'string', true, false),

    // branch_id: new DBType(`Branch #`, 'branch.branch_id', 'number'),
    // branchName: new DBType(`Branch`, 'branchName', 'string', true, false),

    // client_id: new DBType(`Client #`, 'client.client_id', 'number'),
    // clientName: new DBType(`Client`, 'clientName', 'string', true, false),

    // cubicle_name_id: new DBType(`Cubiclename #`, 'cubicleName.cubicle_name_id', 'number'),
    // cubicleNameName: new DBType(`Cubiclename`, 'cubicleNameName', 'string', true, false),

    // rack_id: new DBType(`Rack #`, 'rack.rack_id', 'number'),
    // rackName: new DBType(`Rack`, 'rackName', 'string', true, false),

    // sector_id: new DBType(`Sector #`, 'sector.sector_id', 'number'),
    // sectorName: new DBType(`Sector`, 'sectorName', 'string', true, false),

    // warehouse_id: new DBType(`Warehouse #`, 'warehouse.warehouse_id', 'number'),
    // warehouseName: new DBType(`Warehouse`, 'warehouseName', 'string', true, false),

    // box_id: new DBType(`Document #`, 'documents.box_id', 'number'),
    // documentName: new DBType(`Document`, 'documentName', 'string', true, false),

    // internal_requests_boxes: new DBType(`Internalrequest #`, 'internalRequest.internal_requests_boxes', 'number'),
    // internalRequestName: new DBType(`Internalrequest`, 'internalRequestName', 'string', true, false),

    // requests_boxes: new DBType(`Request #`, 'request.requests_boxes', 'number'),
    // requestName: new DBType(`Request`, 'requestName', 'string', true, false),

    // box_id: new DBType(`Zdocumentsdeleted #`, 'zDocumentsDeleted.box_id', 'number'),
    // zDocumentsDeletedName: new DBType(`Zdocumentsdeleted`, 'zDocumentsDeletedName', 'string', true, false),
  },
  document: {
    tablePK: 'id',
    tableName: 'documents',
    ownName: 'Documento',
    ownNamePlural: 'Documentos',

    id: new DBType('#', 'documents.id', 'number', true, true),
    box_id: new DBType('N° Caja Ransa', 'documents.box_id', 'number', true, true),
    documentTypeName: new DBType(`Tipo documento`, 'documentTypeName', 'string', true, false),
    document_type_id: new DBType('Tipo Documento #', 'documents.document_type_id', 'number', true, true),
    codeBar1: new DBType('Cod Barra Ransa', 'documents.codeBar1', 'string', true, true),
    document_id: new DBType('Doc (P)', 'documents.document_id', 'number', true, true),
    correlative: new DBType('Correlativo', 'documents.correlative', 'number', true, true),

    urcCode: new DBType('URC', 'documents.urcCode', 'string', true, true),
    niu: new DBType('NIU', 'documents.niu', 'string', true, true),
    department: new DBType('Departamento', 'documents.department', 'string', true, true),
    departmentCode: new DBType('Código Departamento', 'documents.departmentCode', 'string', true, true),
    description: new DBType('Descripción', 'documents.description', 'string', true, true),
    descriptionAnnex: new DBType('Anexo', 'documents.descriptionAnnex', 'string', true, true),
    notes: new DBType('Notas', 'documents.notes', 'string', true, true),
    from: new DBType('Desde', 'documents.from', 'string', true, true),
    to: new DBType('Hasta', 'documents.to', 'string', true, true),

    dayStart: new DBType('Día de inicio', 'documents.dayStart', 'number', true, true),
    monthStart: new DBType('Mes de inicio', 'documents.monthStart', 'number', true, true),
    yearStart: new DBType('Año de inicio', 'documents.yearStart', 'number', true, true),
    dayEnd: new DBType('Día de finalización', 'documents.dayEnd', 'number', true, true),
    monthEnd: new DBType('Mes de finalización', 'documents.monthEnd', 'number', true, true),
    yearEnd: new DBType('Año de finalización', 'documents.yearEnd', 'number', true, true),

    clientReference: new DBType('Ref. cliente', 'documents.clientReference', 'string', true, true),
    policy: new DBType('Política', 'documents.policy', 'string', true, true),
    accountReference: new DBType('Ref. cuenta', 'documents.accountReference', 'string', true, true),
    openingDate: new DBType('Fecha de apertura', 'documents.openingDate', 'date', true, true),
    branchCode: new DBType('Código Sucursal', 'documents.branchCode', 'string', true, true),
    branchName: new DBType('Nombre sucursal', 'documents.branchName', 'string', true, true),

    dateStart: new DBType('Fecha de inicio', 'documents.dateStart', 'string', false, false),
    dateEnd: new DBType('Fecha de fin', 'documents.dateEnd', 'string', false, false),
    numBoxClient: new DBType('N° Caja Cliente', 'documents.numBoxClient', 'number', true, true),
    client_id: new DBType('Cliente #', 'documents.client_id', 'number', true, true),
    branch_id: new DBType('Sucursal #', 'documents.branch_id', 'number', true, true),
    branch_name: new DBType('Sucursal', 'documents.branch_name', 'string', true, true),

    request_id: new DBType('Solicitud #', 'documents.request_id', 'number', true, true),
    last_request_status_id: new DBType('Estado', 'documents.last_request_status_id', 'number', true, false),
    internal_request_id: new DBType('Solicitud Interna #', 'documents.internal_request_id', 'number', true, false),
    internal_last_request_id: new DBType('Estado interna', 'documents.internal_last_request_id', 'number', true, false),

    selected: new DBType('Seleccionado', 'documents.selected', 'boolean', false, false),
    isContainer: new DBType('Contenedor', 'documents.isContainer', 'boolean', false, false),

    // createdBy: new DBType('Createdby', 'documents.createdBy', 'number'),
    // updatedBy: new DBType('Updatedby', 'documents.updatedBy', 'number'),
    // created_at: new DBType('Created_At', 'documents.created_at', 'date'),
    // updated_at: new DBType('Updated_At', 'documents.updated_at', 'date'),
    // deleted_at: new DBType('Deleted_At', 'documents.deleted_at', 'date'),

    box_request_id: new DBType('Box_Request_Id', 'documents.box_request_id', 'number', false, false),
    box_last_request_status_id: new DBType(
      'Box_Last_Request_Status_Id',
      'documents.box_last_request_status_id',
      'number',
      false,
      false
    ),
    box_internal_request_id: new DBType(
      'Box_Internal_Request_Id',
      'documents.box_internal_request_id',
      'number',
      false,
      false
    ),
    box_internal_last_request_status_id: new DBType(
      'Box_Internal_Last_Request_Status_Id',
      'documents.box_internal_last_request_status_id',
      'number',
      false,
      false
    ),
    // box_id: new DBType(`Box #`, 'box.box_id', 'number'),
    // boxName: new DBType(`Box`, 'boxName', 'string', true, false),

    // document_type_id: new DBType(`Documenttype #`, 'documentType.document_type_id', 'number'),
    // documentTypeName: new DBType(`Tipo documento`, 'documentTypeName', 'string', true, false),

    // internal_requests_documents: new DBType( `Solicitud Interna #`, 'internalRequest.internal_requests_documents', 'number'),
    // internalRequestName: new DBType(`Internalrequest`, 'internalRequestName', 'string', true, false),

    // requests_documents: new DBType(`Request #`, 'request.requests_documents', 'number'),
    // requestName: new DBType(`Request`, 'requestName', 'string', true, false),

    // document_id: new DBType(`Zdocumentsdeleted #`, 'zDocumentsDeleted.document_id', 'number'),
    // zDocumentsDeletedName: new DBType(`Zdocumentsdeleted`, 'zDocumentsDeletedName', 'string', true, false),
  },
  /* -------------------------------------------------------------------------- */
  /* Warehouses                                                                 */
  /* -------------------------------------------------------------------------- */

  warehouseType: {
    tablePK: 'id',
    tableName: 'warehouse_types',
    ownName: 'Tipo de Almacén',
    ownNamePlural: 'Tipos de Almacén',
    id: new DBType('#', 'warehouse_types.id', 'number'),
    name: new DBType('Nombre', 'warehouse_types.name', 'string'),
    // createdBy: new DBType('Createdby', 'warehouse_types.createdBy', 'number'),
    // updatedBy: new DBType('Updatedby', 'warehouse_types.updatedBy', 'number'),
    // created_at: new DBType('Created_At', 'warehouse_types.created_at', 'date'),
    // updated_at: new DBType('Updated_At', 'warehouse_types.updated_at', 'date'),
    // deleted_at: new DBType('Deleted_At', 'warehouse_types.deleted_at', 'date'),

    warehouse_type_id: new DBType(`Warehouse #`, 'warehouse.warehouse_type_id', 'number'),
    warehouseName: new DBType(`Warehouse`, 'warehouseName', 'string', true, false),
  },
  warehouse: {
    tablePK: 'id',
    tableName: 'warehouses',
    ownName: 'Almacén',
    ownNamePlural: 'Almacenes',
    id: new DBType('#', 'warehouses.id', 'number'),
    name: new DBType('Nombre', 'warehouses.name', 'string'),
    stocktaking: new DBType('Inventario', 'warehouses.stocktaking', 'number'),
    empty_boxes: new DBType('Corrugados (disponibles)', 'warehouses.empty_boxes', 'number'),
    warehouse_type_id: new DBType('Tipo de almacén #', 'warehouses.warehouse_type_id', 'number'),
    createdBy: new DBType('Createdby', 'warehouses.createdBy', 'number'),
    updatedBy: new DBType('Updatedby', 'warehouses.updatedBy', 'number'),
    created_at: new DBType('Created_At', 'warehouses.created_at', 'date'),
    updated_at: new DBType('Updated_At', 'warehouses.updated_at', 'date'),
    deleted_at: new DBType('Deleted_At', 'warehouses.deleted_at', 'date'),

    // // warehouse_type_id: new DBType(`Warehousetype #`, 'warehouseType.warehouse_type_id', 'number'),
    // warehouseTypeName: new DBType(`Warehousetype`, 'warehouseTypeName', 'string', true, false),

    // warehouse_id: new DBType(`Annexbox #`, 'annexBox.warehouse_id', 'number'),
    // annexBoxName: new DBType(`Annexbox`, 'annexBoxName', 'string', true, false),

    // warehouse_id: new DBType(`Box #`, 'box.warehouse_id', 'number'),
    // boxName: new DBType(`Box`, 'boxName', 'string', true, false),

    // : new DBType(`Cubicle #`, 'cubicle.', 'number'),
    // cubicleName: new DBType(`Cubicle`, 'cubicleName', 'string', true, false),

    // warehouse_id: new DBType(`Internalrequest #`, 'internalRequest.warehouse_id', 'number'),
    // internalRequestName: new DBType(`Internalrequest`, 'internalRequestName', 'string', true, false),

    // warehouse_destination_id: new DBType(`Inventorymovement #`, 'inventoryMovement.warehouse_destination_id', 'number'),
    // inventoryMovementName: new DBType(`Inventorymovement`, 'inventoryMovementName', 'string', true, false),

    // warehouse_origin_id: new DBType(`Inventorymovement #`, 'inventoryMovement.warehouse_origin_id', 'number'),
    // inventoryMovementName: new DBType(`Inventorymovement`, 'inventoryMovementName', 'string', true, false),

    // warehouse_id: new DBType(`Request #`, 'request.warehouse_id', 'number'),
    // requestName: new DBType(`Request`, 'requestName', 'string', true, false),

    warehouses_people: new DBType(`Personal Almacén`, 'warehouses_people', 'number'),
    // authPersonName: new DBType(`Authperson`, 'authPersonName', 'string', true, false),

    // warehouse_id: new DBType(`Zboxesdeleted #`, 'zBoxesDeleted.warehouse_id', 'number'),
    // zBoxesDeletedName: new DBType(`Zboxesdeleted`, 'zBoxesDeletedName', 'string', true, false),
    warehouse_id: new DBType(`Almacén #`, 'warehouses_people', 'number'),
    racks: new DBType(`Máximo de muebles`, 'warehouses_people', 'number'),
    sectors: new DBType(`Máximo de Sectores`, 'warehouses_people', 'number'),
    cubicleNames: new DBType(`Máximo de Cubículos`, 'warehouses_people', 'number'),
    floors: new DBType(`Máximo de Pisos`, 'warehouses_people', 'number'),
    boxAmount: new DBType(`Cajas`, 'warehouses_people', 'number'),
    truncate: new DBType(`Forzar`, 'warehouses_people', 'number'),
  },
  rack: {
    tablePK: 'id',
    tableName: 'racks',
    ownName: 'Estante',
    ownNamePlural: 'Estantes',
    id: new DBType('#', 'racks.id', 'number'),
    name: new DBType('Nombre', 'racks.name', 'string'),
    createdBy: new DBType('Createdby', 'racks.createdBy', 'number'),
    updatedBy: new DBType('Updatedby', 'racks.updatedBy', 'number'),
    created_at: new DBType('Created_At', 'racks.created_at', 'date'),
    updated_at: new DBType('Updated_At', 'racks.updated_at', 'date'),
    deleted_at: new DBType('Deleted_At', 'racks.deleted_at', 'date'),

    rack_id: new DBType(`Box #`, 'box.rack_id', 'number'),
    boxName: new DBType(`Box`, 'boxName', 'string', true, false),

    // rack_id: new DBType(`Cubicle #`, 'cubicle.rack_id', 'number'),
    cubicleName: new DBType(`Cubicle`, 'cubicleName', 'string', true, false),

    // rack_id: new DBType(`Zboxesdeleted #`, 'zBoxesDeleted.rack_id', 'number'),
    zBoxesDeletedName: new DBType(`Zboxesdeleted`, 'zBoxesDeletedName', 'string', true, false),
  },
  sector: {
    tablePK: 'id',
    tableName: 'sectors',
    ownName: 'Sector',
    ownNamePlural: 'Sectores',
    id: new DBType('#', 'sectors.id', 'number'),
    name: new DBType('Nombre', 'sectors.name', 'string'),
    createdBy: new DBType('Createdby', 'sectors.createdBy', 'number'),
    updatedBy: new DBType('Updatedby', 'sectors.updatedBy', 'number'),
    created_at: new DBType('Created_At', 'sectors.created_at', 'date'),
    updated_at: new DBType('Updated_At', 'sectors.updated_at', 'date'),
    deleted_at: new DBType('Deleted_At', 'sectors.deleted_at', 'date'),

    sector_id: new DBType(`Box #`, 'box.sector_id', 'number'),
    boxName: new DBType(`Box`, 'boxName', 'string', true, false),

    // sector_id: new DBType(`Cubicle #`, 'cubicle.sector_id', 'number'),
    cubicleName: new DBType(`Cubicle`, 'cubicleName', 'string', true, false),

    // sector_id: new DBType(`Zboxesdeleted #`, 'zBoxesDeleted.sector_id', 'number'),
    zBoxesDeletedName: new DBType(`Zboxesdeleted`, 'zBoxesDeletedName', 'string', true, false),
  },
  cubicleName: {
    tablePK: 'id',
    tableName: 'cubicle_names',
    ownName: 'Nombre de cubículo',
    ownNamePlural: 'Nombres de cubículos',
    id: new DBType('#', 'cubicle_names.id', 'number'),
    name: new DBType('Nombre', 'cubicle_names.name', 'string'),
    createdBy: new DBType('Createdby', 'cubicle_names.createdBy', 'number'),
    updatedBy: new DBType('Updatedby', 'cubicle_names.updatedBy', 'number'),
    created_at: new DBType('Created_At', 'cubicle_names.created_at', 'date'),
    updated_at: new DBType('Updated_At', 'cubicle_names.updated_at', 'date'),
    deleted_at: new DBType('Deleted_At', 'cubicle_names.deleted_at', 'date'),

    cubicle_name_id: new DBType(`Box #`, 'box.cubicle_name_id', 'number'),
    boxName: new DBType(`Box`, 'boxName', 'string', true, false),

    // cubicle_name_id: new DBType(`Cubicle #`, 'cubicle.cubicle_name_id', 'number'),
    cubicleName: new DBType(`Cubicle`, 'cubicleName', 'string', true, false),

    // cubicle_name_id: new DBType(`Zboxesdeleted #`, 'zBoxesDeleted.cubicle_name_id', 'number'),
    zBoxesDeletedName: new DBType(`Zboxesdeleted`, 'zBoxesDeletedName', 'string', true, false),
  },
  cubicle: {
    tablePK: 'warehouse_id',
    tableName: 'cubicles',
    viewName: 'vw_cubicles',
    ownName: 'Cubículo',
    ownNamePlural: 'Cubículos',
    id: new DBType('#', 'vw_cubicles.id', 'string'),
    warehouse_id: new DBType('Almacen #', 'vw_cubicles.warehouse_id', 'number'),
    rack_id: new DBType('Mueble #', 'vw_cubicles.rack_id', 'number'),
    sector_id: new DBType('Sector #', 'vw_cubicles.sector_id', 'number'),
    cubicle_name_id: new DBType('Nombre cubículo', 'vw_cubicles.cubicle_name_id', 'number'),
    floor: new DBType('Piso', 'vw_cubicles.floor', 'number'),
    codeBar: new DBType('Codigo de barra', 'vw_cubicles.codeBar', 'string'),
    isTaken: new DBType('Ocupado', 'vw_cubicles.isTaken', 'boolean'),
    box_type_id: new DBType('Tipo de caja #', 'vw_cubicles.box_type_id', 'boolean'),
    boxAmount: new DBType('Espacios posibles', 'vw_cubicles.boxAmount', 'number'),
    spaces_occupied: new DBType('Espacios ocupados', 'vw_cubicles.spaces_occupied', 'boolean'),
    spaces_lost: new DBType('Espacios perdidos', 'vw_cubicles.spaces_lost', 'boolean'),
    spaces_available: new DBType('Espacios disponibles', 'vw_cubicles.spaces_available', 'boolean'),

    createdBy: new DBType('Createdby', 'vw_cubicles.createdBy', 'number'),
    updatedBy: new DBType('Updatedby', 'vw_cubicles.updatedBy', 'number'),
    created_at: new DBType('Created_At', 'vw_cubicles.created_at', 'date'),
    updated_at: new DBType('Updated_At', 'vw_cubicles.updated_at', 'date'),
    deleted_at: new DBType('Deleted_At', 'vw_cubicles.deleted_at', 'date'),

    // cubicle_name_id: new DBType(`Cubiclename #`, 'cubicleName.cubicle_name_id', 'number'),
    cubicleNameName: new DBType(`Cubículo #`, 'cubicleNameName', 'string', true, false),

    // rack_id: new DBType(`Rack #`, 'rack.rack_id', 'number'),
    rackName: new DBType(`Mueble`, 'rackName', 'string', true, false),

    // sector_id: new DBType(`Sector #`, 'sector.sector_id', 'number'),
    sectorName: new DBType(`Sector`, 'sectorName', 'string', true, false),

    // warehouse_id: new DBType(`Warehouse #`, 'warehouse.warehouse_id', 'number'),
    warehouseName: new DBType(`Warehouse`, 'warehouseName', 'string', true, false),
  },
  annexBox: {
    tablePK: 'id',
    tableName: 'annex_boxes',
    ownName: 'Caja de anexo',
    ownNamePlural: 'Cajas de anexo',
    id: new DBType('#', 'annex_boxes.id', 'number'),
    codeBar: new DBType('Código', 'annex_boxes.codeBar', 'string'),
    warehouse_id: new DBType('Almacén #', 'annex_boxes.warehouse_id', 'number'),
    createdBy: new DBType('Createdby', 'annex_boxes.createdBy', 'number'),
    updatedBy: new DBType('Updatedby', 'annex_boxes.updatedBy', 'number'),
    created_at: new DBType('Created_At', 'annex_boxes.created_at', 'date'),
    updated_at: new DBType('Updated_At', 'annex_boxes.updated_at', 'date'),
    deleted_at: new DBType('Deleted_At', 'annex_boxes.deleted_at', 'date'),

    // warehouse_id: new DBType(`Warehouse #`, 'warehouse.warehouse_id', 'number'),
    warehouseName: new DBType(`Warehouse`, 'warehouseName', 'string', true, false),
  },
  inventoryMovement: {
    tablePK: 'id',
    tableName: 'inventory_movements',
    ownName: 'Movimiento de Inventario',
    ownNamePlural: 'Movimientos de Inventario',
    id: new DBType('#', 'inventory_movements.id', 'number'),
    warehouse_origin_id: new DBType('Almacén de Origen #', 'inventory_movements.warehouse_origin_id', 'number'),
    warehouse_destination_id: new DBType(
      'Almacén de destino #',
      'inventory_movements.warehouse_destination_id',
      'number'
    ),
    box_type_id: new DBType('Tipo de caja #', 'inventory_movements.box_type_id', 'number'),
    description: new DBType('Descripción', 'inventory_movements.description', 'string'),
    movement_type: new DBType('Tipo de movimiento', 'inventory_movements.movement_type', 'number'),
    qty: new DBType('Cantidad', 'inventory_movements.qty', 'number'),
    createdBy: new DBType('Creado por', 'inventory_movements.createdBy', 'number'),
    updatedBy: new DBType('Updatedby', 'inventory_movements.updatedBy', 'number'),
    created_at: new DBType('Created_At', 'inventory_movements.created_at', 'date'),
    updated_at: new DBType('Updated_At', 'inventory_movements.updated_at', 'date'),
    deleted_at: new DBType('Deleted_At', 'inventory_movements.deleted_at', 'date'),

    // box_type_id: new DBType(`Boxtype #`, 'boxType.box_type_id', 'number'),
    // boxTypeName: new DBType(`Boxtype`, 'boxTypeName', 'string', true, false),

    // warehouse_destination_id: new DBType(`Warehouse #`, 'warehouse.warehouse_destination_id', 'number'),
    // warehouseName: new DBType(`Warehouse`, 'warehouseName', 'string', true, false),

    // warehouse_origin_id: new DBType(`Warehouse #`, 'warehouse.warehouse_origin_id', 'number'),
    warehouseOrigin: new DBType(`Almacén de Origen`, 'warehouseOrigin', 'string', true, false),
    warehouseDestination: new DBType(`Almacén de Destino`, 'warehouseDestination', 'string', true, false),
  },
  /* -------------------------------------------------------------------------- */
  /* Clients                                                                    */
  /* -------------------------------------------------------------------------- */

  client: {
    tablePK: 'id',
    tableName: 'clients',
    ownName: 'Cliente',
    ownNamePlural: 'Clientes',
    id: new DBType('#', 'clients.id', 'number'),
    rate_id: new DBType('Tarifa #', 'clients.rate_id', 'number'),
    codClient: new DBType('Código cliente', 'clients.codClient', 'string'),
    name: new DBType('Nombre', 'clients.name', 'string'),
    prize: new DBType('Precio corrugado', 'clients.prize', 'string'),
    copies: new DBType('Copias', 'clients.copies', 'number'),
    quantity_digitized: new DBType('Cantidad de imagenes a digitalizar', 'clients.quantity_digitized', 'number'),
    quantity_boxes: new DBType('Cantidad de cajas', 'clients.quantity_boxes', 'number'),
    express_delivery: new DBType('Envíos urgentes', 'clients.express_delivery', 'number'),
    delivery: new DBType('Envíos no urgentes', 'clients.delivery', 'number'),
    pickup: new DBType('Recolecciones', 'clients.pickup', 'number'),
    on_site_consultations: new DBType('Consultas en Sitio (Presencial)', 'clients.on_site_consultations', 'number'),
    observations: new DBType('Observaciones', 'clients.observations', 'string'),
    city_id: new DBType('City #', 'clients.city_id', 'number'),
    // createdBy: new DBType('Createdby', 'clients.createdBy', 'number'),
    // updatedBy: new DBType('Updatedby', 'clients.updatedBy', 'number'),
    // created_at: new DBType('Created_At', 'clients.created_at', 'date'),
    // updated_at: new DBType('Updated_At', 'clients.updated_at', 'date'),
    // deleted_at: new DBType('Deleted_At', 'clients.deleted_at', 'date'),

    // city_id: new DBType(`City #`, 'city.city_id', 'number'),
    // cityName: new DBType(`City`, 'cityName', 'string', true, false),

    // accounts_clients: new DBType(`Authaccount #`, 'authAccount.accounts_clients', 'number'),
    // authAccountName: new DBType(`Authaccount`, 'authAccountName', 'string', true, false),

    // client_id: new DBType(`Area #`, 'area.client_id', 'number'),
    // areaName: new DBType(`Area`, 'areaName', 'string', true, false),

    // client_id: new DBType(`Authaccount #`, 'authAccount.client_id', 'number'),
    // authAccountName: new DBType(`Authaccount`, 'authAccountName', 'string', true, false),

    // auth_people_clients: new DBType(`Authperson #`, 'authPerson.auth_people_clients', 'number'),
    // authPersonName: new DBType(`Authperson`, 'authPersonName', 'string', true, false),

    // client_id: new DBType(`Box #`, 'box.client_id', 'number'),
    // boxName: new DBType(`Box`, 'boxName', 'string', true, false),

    // client_id: new DBType(`Branch #`, 'branch.client_id', 'number'),
    // branchName: new DBType(`Branch`, 'branchName', 'string', true, false),

    // clients_services: new DBType(`Service #`, 'service.clients_services', 'number'),
    // serviceName: new DBType(`Service`, 'serviceName', 'string', true, false),

    // client_id: new DBType(`Internalrequest #`, 'internalRequest.client_id', 'number'),
    // internalRequestName: new DBType(`Internalrequest`, 'internalRequestName', 'string', true, false),

    // client_id: new DBType(`Rate #`, 'rate.client_id', 'number'),
    // rateName: new DBType(`Rate`, 'rateName', 'string', true, false),

    // client_id: new DBType(`Request #`, 'request.client_id', 'number'),
    // requestName: new DBType(`Request`, 'requestName', 'string', true, false),

    // client_id: new DBType(`Zboxesdeleted #`, 'zBoxesDeleted.client_id', 'number'),
    // zBoxesDeletedName: new DBType(`Zboxesdeleted`, 'zBoxesDeletedName', 'string', true, false),
  },
  branch: {
    tablePK: 'id',
    tableName: 'branches',
    ownName: 'Sucursal',
    ownNamePlural: 'Sucursales',
    id: new DBType('#', 'branches.id', 'number'),
    name: new DBType('Nombre', 'branches.name', 'string'),
    address: new DBType('Dirección', 'branches.address', 'string'),
    client_id: new DBType('Cliente #', 'branches.client_id', 'number'),
    createdBy: new DBType('Createdby', 'branches.createdBy', 'number'),
    updatedBy: new DBType('Updatedby', 'branches.updatedBy', 'number'),
    created_at: new DBType('Created_At', 'branches.created_at', 'date'),
    updated_at: new DBType('Updated_At', 'branches.updated_at', 'date'),
    deleted_at: new DBType('Deleted_At', 'branches.deleted_at', 'date'),

    // client_id: new DBType(`Client #`, 'client.client_id', 'number'),
    clientName: new DBType(`Cliente`, 'clientName', 'string', true, false),

    accounts_branches: new DBType(`Authaccount #`, 'authAccount.accounts_branches', 'number'),
    authAccountName: new DBType(`Authaccount`, 'authAccountName', 'string', true, false),

    branch_id: new DBType(`Area #`, 'area.branch_id', 'number'),
    areaName: new DBType(`Area`, 'areaName', 'string', true, false),

    // branch_id: new DBType(`Authaccount #`, 'authAccount.branch_id', 'number'),
    // authAccountName: new DBType(`Authaccount`, 'authAccountName', 'string', true, false),

    // branch_id: new DBType(`Box #`, 'box.branch_id', 'number'),
    boxName: new DBType(`Box`, 'boxName', 'string', true, false),

    // branch_id: new DBType(`Internalrequest #`, 'internalRequest.branch_id', 'number'),
    internalRequestName: new DBType(`Internalrequest`, 'internalRequestName', 'string', true, false),

    // branch_id: new DBType(`Request #`, 'request.branch_id', 'number'),
    requestName: new DBType(`Request`, 'requestName', 'string', true, false),

    // branch_id: new DBType(`Zboxesdeleted #`, 'zBoxesDeleted.branch_id', 'number'),
    zBoxesDeletedName: new DBType(`Zboxesdeleted`, 'zBoxesDeletedName', 'string', true, false),
  },
  area: {
    tablePK: 'id',
    tableName: 'areas',
    ownName: 'Area',
    ownNamePlural: 'Areas',
    id: new DBType('#', 'areas.id', 'number'),
    name: new DBType('Nombre', 'areas.name', 'string'),
    client_id: new DBType('Cliente #', 'areas.client_id', 'number'),
    branch_id: new DBType('Sucursal #', 'areas.branch_id', 'number'),
    createdBy: new DBType('Createdby', 'areas.createdBy', 'number'),
    updatedBy: new DBType('Updatedby', 'areas.updatedBy', 'number'),
    created_at: new DBType('Created_At', 'areas.created_at', 'date'),
    updated_at: new DBType('Updated_At', 'areas.updated_at', 'date'),
    deleted_at: new DBType('Deleted_At', 'areas.deleted_at', 'date'),

    branchName: new DBType(`Branch`, 'branchName', 'string', true, false),

    // client_id: new DBType(`Client #`, 'client.client_id', 'number'),
    clientName: new DBType(`Client`, 'clientName', 'string', true, false),

    area_id: new DBType(`Authaccount #`, 'authAccount.area_id', 'number'),
    authAccountName: new DBType(`Authaccount`, 'authAccountName', 'string', true, false),

    // area_id: new DBType(`Internalrequest #`, 'internalRequest.area_id', 'number'),
    internalRequestName: new DBType(`Internalrequest`, 'internalRequestName', 'string', true, false),

    // area_id: new DBType(`Request #`, 'request.area_id', 'number'),
    requestName: new DBType(`Request`, 'requestName', 'string', true, false),
  },
  rate: {
    tablePK: 'id',
    tableName: 'rates',
    ownName: 'Tarifa',
    ownNamePlural: 'Tarifas',
    id: new DBType('#', 'rates.id', 'number'),

    client_id: new DBType('Cliente #', 'rates.client_id', 'number'),
    price_for_storage: new DBType('Precio por Almacenamiento (Por caja)', 'rates.price_for_storage', 'string'),
    price_for_inventory_survey: new DBType(
      'Precio por levantamiento de Inventario (Por caja)',
      'rates.price_for_inventory_survey',
      'string'
    ),
    price_for_corrugate: new DBType('Precio corrugado (Por caja)', 'rates.price_for_corrugate', 'string'),

    copies: new DBType('Copias (Por Copia)', 'rates.copies', 'number'),
    quantity_digitalized: new DBType('Imágenes digitalizadas (Por Imagen)', 'rates.quantity_digitalized', 'number'),
    inventory_of_document: new DBType(
      'Organización e Inventario de documentos (Por Documento)',
      'rates.inventory_of_document',
      'number'
    ),
    checklist: new DBType('Lista de chequeo (Por Documento)', 'rates.checklist', 'number'),
    integration: new DBType(
      'Integraciones -anexos de nuevos documentos- (Por Documento)',
      'rates.integration',
      'number'
    ),
    transfer_of_document: new DBType('Traslado de documentos (Por Documento)', 'rates.transfer_of_document', 'number'),
    express_delivery: new DBType('Urgente Express (Por Envío)', 'rates.express_delivery', 'number'),
    fumigation: new DBType('Fumigación (Por servicio)', 'rates.fumigation', 'number'),

    image_scan: new DBType('Escaneo de imágenes', 'rates.image_scan', 'number'),
    current: new DBType('Vigente (Por Imagen)', 'rates.current', 'number'),
    history: new DBType('Histórico (Por Imagen)', 'rates.history', 'number'),
    hosting: new DBType('Hosting (Por Imagen)', 'rates.hosting', 'number'),
    web_viewer: new DBType('Visor Web (Por Imagen)', 'rates.web_viewer', 'number'),
    stacked_book: new DBType('Planos o libros empastados (Por Imagen)', 'rates.stacked_book', 'number'),
    migrated: new DBType('Migraciones (Por Imagen)', 'rates.migrated', 'number'),
    pickup: new DBType('Recolecciones (Por Documento)', 'rates.pickup', 'number'),
    current_staff: new DBType('Personal actual', 'rates.current_staff', 'number'),
    price_day: new DBType('Precio día (Por persona)', 'rates.price_day', 'string'),
    price_month: new DBType('Precio mes (Por persona)', 'rates.price_month', 'string'),
    special_project: new DBType(
      'Proyectos Especiales (Cuadro para especificar el proyecto)',
      'rates.special_project',
      'string'
    ),
    createdBy: new DBType('Createdby', 'rates.createdBy', 'number'),
    updatedBy: new DBType('Updatedby', 'rates.updatedBy', 'number'),
    created_at: new DBType('Created_At', 'rates.created_at', 'date'),
    updated_at: new DBType('Updated_At', 'rates.updated_at', 'date'),
    deleted_at: new DBType('Deleted_At', 'rates.deleted_at', 'date'),

    // client_id: new DBType(`Client #`, 'client.client_id', 'number'),
    clientName: new DBType(`Client`, 'clientName', 'string', true, false),
  },
  /* -------------------------------------------------------------------------- */
  /* Requests                                                                   */
  /* -------------------------------------------------------------------------- */
  request: {
    tablePK: 'id',
    tableName: 'requests',
    ownName: 'Solicitud',
    ownNamePlural: 'Solicitudes',
    id: new DBType('#', 'requests.id', 'number'),

    client_id: new DBType('Cliente #', 'requests.client_id', 'number'),
    client_name: new DBType('Cliente', 'requests.client_name', 'string'),

    branch_id: new DBType('Sucursal #', 'requests.branch_id', 'number'),
    branch_name: new DBType('Sucursal', 'requests.branch_name', 'string'),

    area_id: new DBType('Area #', 'requests.area_id', 'number'),

    account_id: new DBType('Contacto #', 'requests.account_id', 'number'),
    account_name: new DBType('Contacto', 'requests.account_name', 'string'),

    warehouse_id: new DBType('Almacén #', 'requests.warehouse_id', 'number'),
    warehouse_name: new DBType('Almacén', 'requests.warehouse_name', 'string'),
    warehouse_person_id: new DBType('Warehouse_Person_Id', 'requests.warehouse_person_id', 'number'),

    request_type_id: new DBType('Solicitud #', 'requests.request_type_id', 'number'),
    request_type_name: new DBType('Tipo de solicitud', 'requests.request_type_name', 'string'),
    request_status_id: new DBType('Estado solicitud #', 'requests.request_status_id', 'number'),
    request_status_name: new DBType('Estado de solicitud', 'requests.request_status_name', 'string'),
    request_status_created: new DBType('Fecha estado de solicitud', 'requests.request_status_created', 'date'),

    journey_active: new DBType('Journey_Active', 'requests.journey_active', 'boolean'),
    journey_person_id: new DBType('Journey_Person_Id', 'requests.journey_person_id', 'number'),

    expectedDate: new DBType('Fecha esperada', 'requests.expectedDate', 'string'),
    expectedHour: new DBType('Hora esperada', 'requests.expectedHour', 'string'),

    receivingPerson: new DBType('Receivingperson', 'requests.receivingPerson', 'string'),
    receiptSignature: new DBType('Receiptsignature', 'requests.receiptSignature', 'string'),

    shift: new DBType('Turno', 'requests.shift', 'boolean'),
    proof: new DBType('Comprobante', 'requests.proof', 'string'),
    proof_final: new DBType('Comprobante final', 'requests.proof_final', 'string'),
    comment: new DBType('Comentarios', 'requests.comment', 'string'),
    description: new DBType('Descripción', 'requests.description', 'string'),
    numberOfBoxes: new DBType('Número de cajas', 'requests.numberOfBoxes', 'number'),
    expressDelivery: new DBType('Envío urgente', 'requests.expressDelivery', 'boolean'),

    qty_boxes: new DBType('Qty_Boxes', 'requests.qty_boxes', 'number'),
    qty_boxes_selected_w: new DBType('Qty_Boxes_Selected_W', 'requests.qty_boxes_selected_w', 'number'),
    qty_boxes_selected_j: new DBType('Qty_Boxes_Selected_J', 'requests.qty_boxes_selected_j', 'number'),
    qty_docs: new DBType('Qty_Docs', 'requests.qty_docs', 'number'),
    qty_docs_selected_w: new DBType('Qty_Docs_Selected_W', 'requests.qty_docs_selected_w', 'number'),
    qty_docs_selected_j: new DBType('Qty_Docs_Selected_J', 'requests.qty_docs_selected_j', 'number'),
    qty_photocopies: new DBType('Qty_Photocopies', 'requests.qty_photocopies', 'number'),
    qty_scans: new DBType('Qty_Scans', 'requests.qty_scans', 'number'),

    createdByAccount: new DBType('Creada por', 'requests.createdByAccount', 'number'),
    createdBy: new DBType('Creada por', 'requests.createdBy', 'number'),
    updatedBy: new DBType('Actualizada por', 'requests.updatedBy', 'number'),
    created_at: new DBType('Created_At', 'requests.created_at', 'date'),
    updated_at: new DBType('Updated_At', 'requests.updated_at', 'date'),
    deleted_at: new DBType('Deleted_At', 'requests.deleted_at', 'date'),

    // account_id: new DBType(`Authaccount #`, 'authAccount.account_id', 'number'),
    authAccountName: new DBType(`Authaccount`, 'authAccountName', 'string', true, false),

    // area_id: new DBType(`Area #`, 'area.area_id', 'number'),
    areaName: new DBType(`Area`, 'areaName', 'string', true, false),

    // branch_id: new DBType(`Branch #`, 'branch.branch_id', 'number'),
    branchName: new DBType(`Branch`, 'branchName', 'string', true, false),

    // client_id: new DBType(`Client #`, 'client.client_id', 'number'),
    clientName: new DBType(`Client`, 'clientName', 'string', true, false),

    // journey_person_id: new DBType(`Authperson #`, 'authPerson.journey_person_id', 'number'),
    authPersonName: new DBType(`Authperson`, 'authPersonName', 'string', true, false),

    // request_status_id: new DBType(`Requeststatus #`, 'requestStatus.request_status_id', 'number'),
    requestStatusName: new DBType(`Requeststatus`, 'requestStatusName', 'string', true, false),

    // request_type_id: new DBType(`Requesttype #`, 'requestType.request_type_id', 'number'),
    requestTypeName: new DBType(`Requesttype`, 'requestTypeName', 'string', true, false),

    // warehouse_id: new DBType(`Warehouse #`, 'warehouse.warehouse_id', 'number'),
    warehouseName: new DBType(`Warehouse`, 'warehouseName', 'string', true, false),

    // warehouse_person_id: new DBType(`Authperson #`, 'authPerson.warehouse_person_id', 'number'),
    // authPersonName: new DBType(`Authperson`, 'authPersonName', 'string', true, false),

    internal_requests_statuses: new DBType(`Requeststatus #`, 'requestStatus.internal_requests_statuses', 'number'),
    // requestStatusName: new DBType(`Requeststatus`, 'requestStatusName', 'string', true, false),

    journeys_requests: new DBType(`Journey #`, 'journey.journeys_requests', 'number'),
    journeyName: new DBType(`Journey`, 'journeyName', 'string', true, false),

    requests_boxes: new DBType(`Box #`, 'box.requests_boxes', 'number'),
    boxName: new DBType(`Box`, 'boxName', 'string', true, false),

    requests_documents: new DBType(`Document #`, 'documents.requests_documents', 'number'),
    documentName: new DBType(`Document`, 'documentName', 'string', true, false),

    request_id: new DBType(`Requestsincident #`, 'requestsIncident.request_id', 'number'),
    requestsIncidentName: new DBType(`Requestsincident`, 'requestsIncidentName', 'string', true, false),

    requests_statuses: new DBType(`Requeststatus #`, 'requestStatus.requests_statuses', 'number'),
    // requestStatusName: new DBType(`Requeststatus`, 'requestStatusName', 'string', true, false),
  },

  requestType: {
    tablePK: 'id',
    tableName: 'request_types',
    ownName: 'Tipo de solicitud',
    ownNamePlural: 'Tipos de solicitud',
    id: new DBType('#', 'request_types.id', 'number'),
    name: new DBType('Nombre', 'request_types.name', 'string'),
    // createdBy: new DBType('Createdby', 'request_types.createdBy', 'number'),
    // updatedBy: new DBType('Updatedby', 'request_types.updatedBy', 'number'),
    // created_at: new DBType('Created_At', 'request_types.created_at', 'date'),
    // updated_at: new DBType('Updated_At', 'request_types.updated_at', 'date'),
    // deleted_at: new DBType('Deleted_At', 'request_types.deleted_at', 'date'),

    // request_type_id: new DBType(`Internalrequest #`, 'internalRequest.request_type_id', 'number'),
    // internalRequestName: new DBType(`Internalrequest`, 'internalRequestName', 'string', true, false),

    // request_type_id: new DBType(`Request #`, 'request.request_type_id', 'number'),
    // requestName: new DBType(`Request`, 'requestName', 'string', true, false),
  },
  internalRequestType: {
    tablePK: 'id',
    tableName: 'internal_request_types',
    ownName: 'Tipo de solicitud interna',
    ownNamePlural: 'Tipos de solicitud interna',
    id: new DBType('#', 'internal_request_types.id', 'number'),
    name: new DBType('Nombre', 'internal_request_types.name', 'string'),
    // createdBy: new DBType('Createdby', 'internal_request_types.createdBy', 'number'),
    // updatedBy: new DBType('Updatedby', 'internal_request_types.updatedBy', 'number'),
    // created_at: new DBType('Created_At', 'internal_request_types.created_at', 'date'),
    // updated_at: new DBType('Updated_At', 'internal_request_types.updated_at', 'date'),
    // deleted_at: new DBType('Deleted_At', 'internal_request_types.deleted_at', 'date'),
  },
  requestStatus: {
    tablePK: 'id',
    tableName: 'request_statuses',
    ownName: 'Estado de solicitud',
    ownNamePlural: 'Estados de solicitud',
    id: new DBType('#', 'request_statuses.id', 'number'),
    name: new DBType('Nombre', 'request_statuses.name', 'string'),
    description: new DBType('Descripción', 'request_statuses.description', 'string'),
    // createdBy: new DBType('Createdby', 'request_statuses.createdBy', 'number'),
    // updatedBy: new DBType('Updatedby', 'request_statuses.updatedBy', 'number'),
    // created_at: new DBType('Created_At', 'request_statuses.created_at', 'date'),
    // updated_at: new DBType('Updated_At', 'request_statuses.updated_at', 'date'),
    // deleted_at: new DBType('Deleted_At', 'request_statuses.deleted_at', 'date'),

    // request_status_id: new DBType(`Internalrequest #`, 'internalRequest.request_status_id', 'number'),
    // internalRequestName: new DBType(`Internalrequest`, 'internalRequestName', 'string', true, false),

    // internal_requests_statuses: new DBType(`Request #`, 'request.internal_requests_statuses', 'number'),
    // requestName: new DBType(`Request`, 'requestName', 'string', true, false),

    // request_status_id: new DBType(`Request #`, 'request.request_status_id', 'number'),
    // requestName: new DBType(`Request`, 'requestName', 'string', true, false),

    // requests_statuses: new DBType(`Request #`, 'request.requests_statuses', 'number'),
    // requestName: new DBType(`Request`, 'requestName', 'string', true, false),
  },
  internalRequestStatus: {
    tablePK: 'id',
    tableName: 'internal_request_statuses',
    ownName: 'Estado de solicitud interna',
    ownNamePlural: 'Estados de solicitud interna',
    id: new DBType('#', 'internal_request_statuses.id', 'number'),
    name: new DBType('Nombre', 'internal_request_statuses.name', 'string'),
    description: new DBType('Descripción', 'internal_request_statuses.description', 'string'),
    // createdBy: new DBType('Createdby', 'internal_request_statuses.createdBy', 'number'),
    // updatedBy: new DBType('Updatedby', 'internal_request_statuses.updatedBy', 'number'),
    // created_at: new DBType('Created_At', 'internal_request_statuses.created_at', 'date'),
    // updated_at: new DBType('Updated_At', 'internal_request_statuses.updated_at', 'date'),
    // deleted_at: new DBType('Deleted_At', 'internal_request_statuses.deleted_at', 'date'),
  },
  /* -------------------------------------------------------------------------- */
  /* reports                                                                    */
  /* -------------------------------------------------------------------------- */

  bulkError: {
    tablePK: 'id',
    tableName: 'bulk_errors',
    ownName: 'Error',
    ownNamePlural: 'Consulta de errores',
    id: new DBType('Id', 'bulk_errors.id', 'number'),
    payload: new DBType('Detalle', 'bulk_errors.payload', 'string'),
    queue: new DBType('Nombre del proceso', 'bulk_errors.queue', 'string'),
    container_id: new DBType('Container_Id', 'bulk_errors.container_id', 'number'),
    created_at: new DBType('Fecha', 'bulk_errors.created_at', 'date'),
  },
  /* -------------------------------------------------------------------------- */
  /* User                                                                       */
  /* -------------------------------------------------------------------------- */

  user: {
    tablePK: 'id',
    tableName: 'auth_users',

    ownName: 'Usuario',
    ownNamePlural: 'Usuarios',

    id: new DBType('#', 'auth_users.id', 'string'),
    name: new DBType('Nombre', 'auth_users.name', 'string'),
    email: new DBType('Correo electrónico', 'auth_users.email', 'string'),
    password: new DBType('Contraseña', 'auth_users.password', 'string', false),
    email_verified_at: new DBType('Correo electrónico verificado', 'auth_users.email_verified_at', 'date'),
    disabled: new DBType('Estado', 'auth_users.disabled', 'string'),
    phoneNumber: new DBType('Teléfono', 'auth_users.phoneNumber', 'string'),

    photo: new DBType('Foto', 'photo', 'object', false, false),
    pdf: new DBType('Documento (PDF)', 'pdf', 'object', false, false),

    country_id: new DBType(`País #`, 'auth_users.country_id', 'number'),
    countryName: new DBType(`País`, 'countryName', 'string', true, false),

    region_id: new DBType(`Region #`, 'auth_users.region_id', 'number'),
    regionName: new DBType(`Region`, 'regionName', 'string', true, false),

    city_id: new DBType(`Ciudad #`, 'auth_users.city_id', 'number'),
    cityName: new DBType(`Ciudad`, 'cityName', 'string', true, false),

    role_id: new DBType(`Rol #`, 'auth_users.role_id', 'number'),
    roleName: new DBType(`Rol`, 'roleName', 'string', true, false),

    account_id: new DBType(`Cuenta #`, 'account.user_id', 'number', false, false),
    accountName: new DBType(`Cuenta`, 'accountName', 'string', false, false),

    person_id: new DBType(`Persona #`, 'person.user_id', 'number', false, false),
    personName: new DBType(`Persona`, 'personName', 'string', false, false),
  },
  role: {
    tablePK: 'id',
    tableName: 'auth_roles',
    ownName: 'Rol',
    ownNamePlural: 'Roles',
    // Raw attributes
    id: new DBType('#', 'auth_roles.id', 'number'),
    name: new DBType('Nombre', 'auth_roles.name', 'string'),
    description: new DBType('Descripción', 'auth_roles.description', 'string'),
  },
  permission: {
    tablePK: 'id',
    tableName: 'auth_permissions',
    ownName: 'Permiso',
    ownNamePlural: 'Permisos',
    // Raw attributes
    id: new DBType('#', 'auth_permissions.id', 'number'),
    icon: new DBType('Icono', 'auth_permissions.icon', 'string'),
    name: new DBType('Nombre', 'auth_permissions.name', 'string'),
    urlBackEnd: new DBType('Url Back End', 'auth_permissions.urlBackEnd', 'string'),
    urlFrontEnd: new DBType('Url Front End', 'auth_permissions.urlFrontEnd', 'string'),
    isSection: new DBType('Is Section?', 'auth_permissions.isSection', 'boolean'),
    isVisible: new DBType('Is Visible?', 'auth_permissions.isVisible', 'boolean'),
    permission_id: new DBType('Permission Id', 'auth_permissions.permission_id', 'number'),
    orderInMenu: new DBType('Order In Menu', 'auth_permissions.orderInMenu', 'number'),
  },
  person: {
    tablePK: 'id',
    tableName: 'auth_people',

    ownName: 'Persona',
    ownNamePlural: 'Personas',

    id: new DBType('#', 'auth_people.id', 'string'),
    firstName: new DBType('Nombre', 'auth_people.firstName', 'string'),
    lastName: new DBType('Apellido', 'auth_people.lastName', 'string'),
    cell_phone: new DBType('Celular', 'auth_people.cellPhone', 'string'),
    birthDate: new DBType('Fecha de nacimiento', 'auth_people.birthDate', 'date'),
    address: new DBType('Dirección', 'auth_people.address', 'string'),
    neighborhood: new DBType('Vecindario', 'auth_people.neighborhood', 'string'),
    dui: new DBType('Documento de identificación', 'people.dui', 'string'),
    dui_expiration_date: new DBType('Expiración', 'people.dui_expiration_date', 'date'),

    user_id: new DBType('User #', 'auth_people.user_id', 'number'),
  },
  account: {
    tablePK: 'id',
    tableName: 'auth_accounts',

    ownName: 'Contacto',
    ownNamePlural: 'Contactos',

    id: new DBType('#', 'auth_accounts.id', 'string'),
    firstName: new DBType('Nombre', 'auth_accounts.firstName', 'string'),
    lastName: new DBType('Apellido', 'auth_accounts.lastName', 'string'),
    phone: new DBType('Teléfono', 'auth_accounts.phone', 'string'),
    cell_phone: new DBType('Celular', 'auth_accounts.cell_phone', 'string'),
    job: new DBType('Cargo/puesto', 'auth_accounts.job', 'string'),
    birthDate: new DBType('Fecha de nacimiento', 'auth_accounts.birthDate', 'date'),
    address: new DBType('Dirección', 'auth_accounts.address', 'string'),
    neighborhood: new DBType('Vecindario', 'auth_accounts.neighborhood', 'string'),
    dui: new DBType('Documento de Identidad', 'auth_accounts.dui', 'string'),
    for_notification_only: new DBType(
      'Contacto solo para enviar notificación de nuevas solicitudes',
      'auth_accounts.for_notification_only',
      'boolean'
    ),

    user_id: new DBType('User #', 'auth_accounts.user_id', 'number'),

    area_id: new DBType(`Area #`, 'area.area_id', 'number'),
    areaName: new DBType(`Area`, 'areaName', 'string', true, false),
  },
  /* -------------------------------------------------------------------------- */
  /* Countries                                                                  */
  /* -------------------------------------------------------------------------- */

  zone: {
    tablePK: 'id',
    tableName: 'zones',
    ownName: 'Zona',
    ownNamePlural: 'Zonas',
    id: new DBType('#', 'zones.id', 'number'),
    name: new DBType('Nombre', 'zones.name', 'string'),
    // createdBy: new DBType('Createdby', 'zones.createdBy',  'number'),
    // updatedBy: new DBType('Updatedby', 'zones.updatedBy',  'number'),
    // created_at: new DBType('Created_At', 'zones.created_at',  'date'),
    // updated_at: new DBType('Updated_At', 'zones.updated_at',  'date'),
    // deleted_at: new DBType('Deleted_At', 'zones.deleted_at',  'date'),

    // zone_id: new DBType(`City #`, 'city.zone_id', 'number'),
    // cityName: new DBType(`City`, 'cityName', 'string', true, false),

    // zone_id: new DBType(`Region #`, 'region.zone_id', 'number'),
    // regionName: new DBType(`Region`, 'regionName', 'string', true, false),
  },
  region: {
    tablePK: 'id',
    tableName: 'regions',
    ownName: 'Departamento/Provincia',
    ownNamePlural: 'Departamentos/Provincias',
    id: new DBType('#', 'regions.id', 'number'),
    name: new DBType('Nombre', 'regions.name', 'string'),
    code: new DBType('Código', 'regions.code', 'string'),
    zone_id: new DBType('Zona #', 'regions.zone_id', 'number'),
    // createdBy: new DBType('Createdby', 'regions.createdBy', 'number'),
    // updatedBy: new DBType('Updatedby', 'regions.updatedBy', 'number'),
    // created_at: new DBType('Created_At', 'regions.created_at', 'date'),
    // updated_at: new DBType('Updated_At', 'regions.updated_at', 'date'),
    // deleted_at: new DBType('Deleted_At', 'regions.deleted_at', 'date'),

    // // zone_id: new DBType(`Zone #`, 'zone.zone_id', 'number'),
    // zoneName: new DBType(`Zone`, 'zoneName', 'string', true, false),

    // region_id: new DBType(`City #`, 'city.region_id', 'number'),
    // cityName: new DBType(`City`, 'cityName', 'string', true, false),
  },
  city: {
    tablePK: 'id',
    tableName: 'cities',
    ownName: 'Ciudad',
    ownNamePlural: 'Ciudades',
    id: new DBType('#', 'cities.id', 'number'),
    name: new DBType('Nombre', 'cities.name', 'string'),
    latitude: new DBType('Latitud', 'cities.latitude', 'string'),
    longitude: new DBType('Longitud', 'cities.longitude', 'string'),
    region_id: new DBType('Region #', 'cities.region_id', 'number'),
    zone_id: new DBType('Zone #', 'cities.zone_id', 'number'),
    createdBy: new DBType('Createdby', 'cities.createdBy', 'number'),
    updatedBy: new DBType('Updatedby', 'cities.updatedBy', 'number'),
    created_at: new DBType('Created_At', 'cities.created_at', 'date'),
    updated_at: new DBType('Updated_At', 'cities.updated_at', 'date'),
    deleted_at: new DBType('Deleted_At', 'cities.deleted_at', 'date'),

    // region_id: new DBType(`Region #`, 'region.region_id', 'number'),
    regionName: new DBType(`Region`, 'regionName', 'string', true, false),

    // zone_id: new DBType(`Zone #`, 'zone.zone_id', 'number'),
    zoneName: new DBType(`Zone`, 'zoneName', 'string', true, false),

    // city_id: new DBType(`Client #`, 'client.city_id', 'number'),
    clientName: new DBType(`Client`, 'clientName', 'string', true, false),
  },
}
