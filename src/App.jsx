
import React, { useState, useEffect, useMemo } from 'react';
import {
  ShoppingCart, Plus, Trash2, Edit, CheckCircle, Clock,
  DollarSign, TrendingUp, Package, Settings, Printer,
  Store, Truck, FileText, RefreshCw, AlertCircle, X, Save, ChefHat,
  Calendar as CalendarIcon, Sparkles, ChevronLeft, ChevronRight
} from 'lucide-react';


// Catálogo oficial predeterminado de Nova Dulces Creaciones
const INITIAL_PRODUCTS = [
  { id: 'P001', nombre: 'Bizcocho Suspiro Vainilla 1 lb', categoria: 'Enteros', precio: 2200, costo: 850, activo: true },
  { id: 'P002', nombre: 'Bizcocho Suspiro Vainilla 1/2 lb', categoria: 'Enteros', precio: 1150, costo: 450, activo: true },
  { id: 'P003', nombre: 'Bizcocho Suspiro Chocolate 1 lb', categoria: 'Enteros', precio: 2250, costo: 900, activo: true },
  { id: 'P004', nombre: 'Bizcocho Suspiro Chocolate 1/2 lb', categoria: 'Enteros', precio: 1200, costo: 480, activo: true },
  { id: 'P005', nombre: 'Bizcocho Suspiro Mármol cake 1 lb', categoria: 'Enteros', precio: 2250, costo: 900, activo: true },
  { id: 'P006', nombre: 'Bizcocho Suspiro Mármol cake 1/2 lb', categoria: 'Enteros', precio: 1200, costo: 480, activo: true },
  { id: 'P007', nombre: 'Bizcocho Suspiro Carrot cake 1 lb', categoria: 'Enteros', precio: 2200, costo: 880, activo: true },
  { id: 'P008', nombre: 'Bizcocho Suspiro Carrot cake 1/2 lb', categoria: 'Enteros', precio: 1150, costo: 460, activo: true },
  { id: 'P009', nombre: 'Bizcocho Chantilly Vainilla 1 lb', categoria: 'Enteros', precio: 3550, costo: 1400, activo: true },
  { id: 'P010', nombre: 'Bizcocho Chantilly Vainilla 1/2 lb', categoria: 'Enteros', precio: 1800, costo: 750, activo: true },
  { id: 'P011', nombre: 'Bizcocho Chantilly Chocolate 1 lb', categoria: 'Enteros', precio: 3600, costo: 1450, activo: true },
  { id: 'P012', nombre: 'Bizcocho Chantilly Chocolate 1/2 lb', categoria: 'Enteros', precio: 1850, costo: 780, activo: true },
  { id: 'P013', nombre: 'Personalizado Suspiro Modelo A 1 lb', categoria: 'Bizcochos Personalizados', precio: 2550, costo: 1000, activo: true },
  { id: 'P014', nombre: 'Personalizado Suspiro Modelo A 1/2 lb', categoria: 'Bizcochos Personalizados', precio: 1500, costo: 600, activo: true },
  { id: 'P015', nombre: 'Personalizado Chantilly Modelo A 1 lb', categoria: 'Bizcochos Personalizados', precio: 3850, costo: 1500, activo: true },
  { id: 'P016', nombre: 'Personalizado Chantilly Modelo A 1/2 lb', categoria: 'Bizcochos Personalizados', precio: 2100, costo: 850, activo: true },
  { id: 'B001', nombre: 'Croquetas (Und)', categoria: 'Bocadillos', precio: 35, costo: 14, activo: true },
  { id: 'B002', nombre: 'Empanaditas Pollo (Und)', categoria: 'Bocadillos', precio: 35, costo: 14, activo: true },
  { id: 'B003', nombre: 'Empanaditas Barbacoa (Und)', categoria: 'Bocadillos', precio: 35, costo: 14, activo: true },
  { id: 'B004', nombre: 'Empanaditas Queso (Und)', categoria: 'Bocadillos', precio: 30, costo: 12, activo: true },
  { id: 'B005', nombre: 'Quipesitos (Und)', categoria: 'Bocadillos', precio: 40, costo: 16, activo: true },
  { id: 'B006', nombre: 'Volobanes (Und)', categoria: 'Bocadillos', precio: 45, costo: 18, activo: true },
  { id: 'B007', nombre: 'Piscinitas (Und)', categoria: 'Bocadillos', precio: 45, costo: 18, activo: true },
  { id: 'B008', nombre: 'Pancitos Crema de Queso y Puerro', categoria: 'Bocadillos', precio: 20, costo: 8, activo: true },
  { id: 'B009', nombre: 'Combo Clásico Bocadillos', categoria: 'Bocadillos', precio: 550, costo: 220, activo: true },
  { id: 'B010', nombre: 'Combo Completo Bocadillos', categoria: 'Bocadillos', precio: 1325, costo: 530, activo: true },
  { id: 'M001', nombre: 'Brownie Fudgy Porción', categoria: 'Porciones de postres', precio: 150, costo: 60, activo: true },
  { id: 'M002', nombre: 'Mousse de Chinola Porción', categoria: 'Porciones de postres', precio: 180, costo: 70, activo: true },
  { id: 'M003', nombre: 'Postre de Molde', categoria: 'Porciones de postres', precio: 350, costo: 140, activo: true }
];

const CATEGORIAS = ['Todos', 'Enteros', 'Bizcochos Personalizados', 'Bocadillos', 'Porciones de postres'];
const ESTADOS = ['Por confirmar', 'Por pagar', 'Confirmada', 'Entregada', 'Cancelada'];
const METODOS_PAGO = ['Efectivo', 'Transferencia', 'Tarjeta'];
const CATEGORIAS_GASTO = ['Ingredientes', 'Empaques', 'Servicios', 'Utensilios', 'Delivery/Transporte', 'Otros'];

// Mapeo oficial de colores por estado
const STATUS_STYLES = {
  'Por confirmar': { bg: 'bg-[#FFF2CC]', text: 'text-amber-900', border: 'border-amber-300', hex: '#FFF2CC' },
  'Por pagar': { bg: 'bg-[#FCE5CD]', text: 'text-orange-900', border: 'border-orange-300', hex: '#FCE5CD' },
  'Confirmada': { bg: 'bg-[#C9DAF8]', text: 'text-blue-900', border: 'border-blue-300', hex: '#C9DAF8' },
  'Entregada': { bg: 'bg-[#D9EAD3]', text: 'text-green-900', border: 'border-green-300', hex: '#D9EAD3' },
  'Cancelada': { bg: 'bg-[#F4CCCC]', text: 'text-red-900', border: 'border-red-300', hex: '#F4CCCC' }
};

// Conversor de hora a formato 12 horas AM/PM
const formatTime12h = (time24) => {
  if (!time24) return '';
  
  // Limpiar espacios y asegurar texto
  const str = String(time24).trim();
  
  // Extraer horas y minutos ignorando segundos o la 'T' de fechas ISO
  const match = str.match(/(?:T|^)(\d{1,2}):(\d{2})/);
  if (!match) return time24;
  
  let hours = parseInt(match[1], 10);
  const minutes = match[2];
  
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // El número 0 debe ser 12
  
  return `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
};


const formatDisplayDate = (value) => {
  if (!value) return "";

  const text = String(value).trim();

  // Si ya está en formato DD/MM/YYYY, lo dejamos igual.
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(text)) {
    return text;
  }

  // Si viene en formato YYYY-MM-DD, lo convertimos.
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (match) {
    return `${match[3]}/${match[2]}/${match[1]}`;
  }

  return text;
};


export default function App() {
  const [activeTab, setActiveTab] = useState('pos');
  const [calendarMonth, setCalendarMonth] = useState(() => new Date());
  const [selectedCalendarDate, setSelectedCalendarDate] = useState(() => {
    const today = new Date();
    return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  });
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('nova_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('nova_orders');
    return saved ? JSON.parse(saved) : [];
  });
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('nova_expenses');
    return saved ? JSON.parse(saved) : [];
  });

  // URL padronizada padrão para Google Sheets
  const [apiUrl, setApiUrl] = useState(() => {
    return localStorage.getItem('nova_api_url') || 'https://script.google.com/macros/s/AKfycbwTBYKfD9ne5mfxuMUxVnouMRJbrkn9SEAC2VVVniPFcmXBmnxAyt-QnokkKvcdemoF/exec';
  });

  // Filtros POS
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Formulario de Pedido / Checkout
  const [checkoutForm, setCheckoutForm] = useState({
    cliente: '',
    telefono: '',
    tipoEntrega: 'Retiro en Tienda',
    costoDelivery: 0,
    llevaExtras: false,
    detallesExtras: '',
    costoExtras: 0,
    direccionNotas: '',
    metodoPago: 'Efectivo',
    fechaEntrega: new Date().toISOString().split('T')[0],
    horaEntrega: '14:00'
  });

  // Modal de Edición de Pedido Existente
  const [editingOrder, setEditingOrder] = useState(null);
  const [selectedAddProduct, setSelectedAddProduct] = useState('');

  // Modal de Producto (Crear/Editar)
  const [productModal, setProductModal] = useState({ open: false, data: null });
  
  // Formulario de Gasto
  const [expenseForm, setExpenseForm] = useState({
    categoria: 'Ingredientes',
    descripcion: '',
    monto: ''
  });

  // Pedido seleccionado para ver factura/imprimir
  const [selectedOrderReceipt, setSelectedOrderReceipt] = useState(null);

  // Guardar en localStorage
  useEffect(() => { localStorage.setItem('nova_products', JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem('nova_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('nova_expenses', JSON.stringify(expenses)); }, [expenses]);
  useEffect(() => { localStorage.setItem('nova_api_url', apiUrl); }, [apiUrl]);

  
useEffect(() => {
  if (!apiUrl) return;

  const controller = new AbortController();

  // Busca el nombre exacto de la columna.
  const get = (obj, ...keys) => {
    for (const key of keys) {
      if (
        obj &&
        Object.prototype.hasOwnProperty.call(obj, key) &&
        obj[key] !== null &&
        obj[key] !== undefined
      ) {
        return obj[key];
      }
    }

    return "";
  };

  const toNumber = (value) => {
    if (value === "" || value == null) return 0;
    if (typeof value === "number") {
      return Number.isFinite(value) ? value : 0;
    }

    const parsed = Number(String(value).trim().replace(/,/g, ""));
    return Number.isFinite(parsed) ? parsed : 0;
  };

  const toBoolean = (value) => {
    if (typeof value === "boolean") return value;
    if (typeof value === "number") return value !== 0;

    return ["true", "1", "sí", "si", "yes"]
      .includes(String(value).trim().toLowerCase());
  };

  // Convierte una hora de Sheets a HH:mm.
  
const formatDate = (value) => {
  if (!value) return "";

  // Evita que una fecha vacía se convierta en una fecha ficticia.
  const text = String(value).trim();
  if (!text) return "";

  // Extrae YYYY-MM-DD de fechas ISO sin problemas de zona horaria.
  const match = text.match(/^(\d{4})-(\d{2})-(\d{2})/);

  if (match) {
    return `${match[3]}/${match[2]}/${match[1]}`;
  }

  // Admite fechas ya formateadas como DD/MM/YYYY.
  const localMatch = text.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);

  if (localMatch) return text;

  // No altera silenciosamente valores que no reconoce.
  return text;
};

  const normalizeTime = (value) => {
    if (!value) return "";

    const text = String(value).trim();

    // 1. Extraer HH:MM ya sea de una fecha ISO o formato simple
    let hours = 0;
    let minutes = "";
    
    const isoMatch = text.match(/T(\d{2}):(\d{2})/);
    const timeMatch = text.match(/^(\d{1,2}):(\d{2})/);

    if (isoMatch) {
      hours = parseInt(isoMatch[1], 10);
      minutes = isoMatch[2];
    } else if (timeMatch) {
      hours = parseInt(timeMatch[1], 10);
      minutes = timeMatch[2];
    } else {
      return text; // Si no reconoce el formato, devuelve el valor original
    }

    // 2. Convertir mecánicamente a formato 12 horas (AM/PM) en la carga inicial
    const ampm = hours >= 12 ? 'PM' : 'AM';
    let h12 = hours % 12;
    h12 = h12 ? h12 : 12; // Si es 00, se transforma en 12

    return `${String(h12).padStart(2, "0")}:${minutes} ${ampm}`;
  };


  // Ejemplo: 14:00:00 -> 14:00
  const timeMatch = text.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);

  if (timeMatch) {
    return `${timeMatch[1].padStart(2, "0")}:${timeMatch[2]}`;
  }

  return text;
};


  const normalizeDetail = (d) => ({
    idPedido: get(d, "ID Pedido"),
    idDetalle: get(d, "ID Detalle"),
    idProducto: get(d, "ID Producto"),
    producto: get(d, "Producto"),
    categoria: get(d, "Categoría"),
    cantidad: toNumber(get(d, "Cantidad")),
    precioUnitario: toNumber(get(d, "Precio Unitario (DOP)")),
    subtotal: toNumber(get(d, "Subtotal (DOP)")),
    costoProduccion: toNumber(get(d, "Costo Producción (DOP)")),
  });

  const normalizeOrder = (o, detailsByOrder) => {
    const idPedido = get(o, "ID Pedido");

    return {
      idPedido,
      fechaRegistro: get(o, "Fecha Registro"),
      fechaEntrega: formatDate(get(o, "Fecha Entrega")),
      horaEntrega: normalizeTime(get(o, "Hora Entrega")),
      cliente: get(o, "Cliente"),
      telefono: get(o, "Teléfono"),
      tipoEntrega: get(o, "Tipo Entrega"),
      costoDelivery: toNumber(get(o, "Costo Delivery (DOP)")),

      // Estas columnas no aparecen en la respuesta actual.
      llevaExtras: toBoolean(get(o, "Lleva Extras")),
      detallesExtras: get(o, "Detalles Extras"),
      costoExtras: toNumber(get(o, "Costo Extras (DOP)")),

      direccionNotas: get(o, "Dirección / Notas"),
      metodoPago: get(o, "Método de Pago"),
      estado: get(o, "Estado"),
      totalPedido: toNumber(get(o, "Total Pedido (DOP)")),
      costoProduccion: toNumber(get(o, "Costo Producción (DOP)")),
      gananciaNeta: toNumber(get(o, "Ganancia Neta (DOP)")),

      // Los detalles vienen en otra lista del JSON.
      detalles: detailsByOrder[String(idPedido)] || [],
    };
  };

  const loadOrders = async () => {
    try {
      const res = await fetch(apiUrl, {
        method: "GET",
        signal: controller.signal,
      });

      if (!res.ok) {
        throw new Error(`Error HTTP ${res.status}`);
      }

      const response = await res.json();

      if (response?.success !== true) {
        throw new Error(
          response?.message || "Respuesta inválida de Apps Script"
        );
      }

      const data = response.data;

          if (Array.isArray(data.catalogo)) {
            const realProducts = data.catalogo.map((product) => ({
              id: String(product.ID || ''),
              nombre: String(product.Producto || ''),
              categoria: String(product['Categoría'] || ''),
              precio: Number(product['Precio Venta (DOP)'] || 0),
              costo: Number(product['Costo Producción (DOP)'] || 0),
              activo:
                product.Activo === true ||
                String(product.Activo).toLowerCase() === 'true'
            }));
          
            setProducts(realProducts);
            localStorage.setItem('nova_products', JSON.stringify(realProducts));
          
            console.info('Productos cargados desde Google Sheets:', realProducts.length);
          }

      if (!data || !Array.isArray(data.pedidos)) {
        throw new Error("La respuesta no contiene data.pedidos");
      }

      const rawDetails = Array.isArray(data.detalles)
        ? data.detalles
        : [];

      // Agrupa los productos por el ID del pedido.
      const detailsByOrder = Object.create(null);

      rawDetails.forEach((detail) => {
        if (!detail || typeof detail !== "object") return;

        const id = get(detail, "ID Pedido");
        if (id === "") return;

        const key = String(id);

        if (!detailsByOrder[key]) {
          detailsByOrder[key] = [];
        }

        detailsByOrder[key].push(normalizeDetail(detail));
      });

      const realOrders = data.pedidos
        .filter((order) =>
          order && typeof order === "object" && !Array.isArray(order)
        )
        .map((order) => normalizeOrder(order, detailsByOrder));

      // También actualiza si Google Sheets devuelve cero pedidos.
      setOrders(realOrders);

           console.info("Pedidos sincronizados:", realOrders.length);
          console.info("Detalles recibidos:", rawDetails.length);
            } catch (error) {
              if (error.name !== "AbortError") {
                console.error("Error sincronizando pedidos:", error);
              }
            }
          };
        
          // 1. Ejecutar la función de carga inicial
          loadOrders();
        
          // 2. Retornar la función de limpieza correctamente estructurada
          return () => {
            controller.abort();
          };
        }, [apiUrl]); // Ejecutar ÚNICAMENTE cuando cambie la URL base




  
  // Carrito helpers
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item);
      }
      return [...prev, { ...product, cantidad: 1 }];
    });
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.cantidad + delta;
        return newQty > 0 ? { ...item, cantidad: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const cartTotals = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
    const costoProduccion = cart.reduce((acc, item) => acc + (item.costo * item.cantidad), 0);
    const delivery = checkoutForm.tipoEntrega === 'Delivery' ? Number(checkoutForm.costoDelivery || 0) : 0;
    const extras = checkoutForm.llevaExtras ? Number(checkoutForm.costoExtras || 0) : 0;
    const total = subtotal + delivery + extras;
    const gananciaNeta = total - costoProduccion;
    return { subtotal, costoProduccion, delivery, extras, total, gananciaNeta };
  }, [cart, checkoutForm]);

  // Crear Pedido
  const handleCreateOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert('El carrito está vacío');
    if (!checkoutForm.cliente) return alert('Por favor ingresa el nombre del cliente');

    const newOrder = {
      idPedido: `PED-${String(orders.length + 1).padStart(4, '0')}`,
      fechaRegistro: new Date().toISOString(),
      fechaEntrega: checkoutForm.fechaEntrega,
      horaEntrega: checkoutForm.horaEntrega,
      cliente: checkoutForm.cliente,
      telefono: checkoutForm.telefono,
      tipoEntrega: checkoutForm.tipoEntrega,
      costoDelivery: checkoutForm.tipoEntrega === 'Delivery' ? Number(checkoutForm.costoDelivery) : 0,
      llevaExtras: checkoutForm.llevaExtras,
      detallesExtras: checkoutForm.llevaExtras ? checkoutForm.detallesExtras : '',
      costoExtras: checkoutForm.llevaExtras ? Number(checkoutForm.costoExtras || 0) : 0,
      direccionNotas: checkoutForm.direccionNotas,
      metodoPago: checkoutForm.metodoPago,
      estado: 'Por confirmar',
      totalPedido: cartTotals.total,
      costoProduccion: cartTotals.costoProduccion,
      gananciaNeta: cartTotals.gananciaNeta,
      detalles: cart.map(item => ({
        producto: item.nombre,
        categoria: item.categoria,
        cantidad: item.cantidad,
        precioUnitario: item.precio,
        subtotal: item.precio * item.cantidad,
        costoProduccion: item.costo * item.cantidad
      }))
    };

    setOrders(prev => [newOrder, ...prev]);

    if (apiUrl) {
      try {
        await fetch(apiUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'crearPedido', pedido: newOrder, detalles: newOrder.detalles })
        });
      } catch (err) {
        console.error('Error enviando a Sheets:', err);
      }
    }

    setCart([]);
    setCheckoutForm({
      cliente: '', telefono: '', tipoEntrega: 'Retiro en Tienda',
      costoDelivery: 0, llevaExtras: false, detallesExtras: '', costoExtras: 0,
      direccionNotas: '', metodoPago: 'Efectivo',
      fechaEntrega: new Date().toISOString().split('T')[0], horaEntrega: '14:00'
    });
    setSelectedOrderReceipt(newOrder);
  };


  
  // Abrir Modal para editar pedido
  const startEditingOrder = (order) => {
    setEditingOrder(JSON.parse(JSON.stringify(order)));
  };

          // ✅ PEGA ESTE NUEVO BLOQUE OPTIMIZADO
        const calendarOrdersByDate = useMemo(() => {
          return orders.reduce((groups, order) => {
            if (!order.fechaEntrega) return groups;
            
            const value = String(order.fechaEntrega).trim();
            let dateKey = '';
      
            // Si ya viene en formato correcto YYYY-MM-DD
            const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
            if (isoMatch) {
              dateKey = `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
            } else {
              // Conversión estricta si viene en formato DD/MM/YYYY de Google Sheets
              const localMatch = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
              if (localMatch) {
                dateKey = `${localMatch[3]}-${localMatch[2].padStart(2, '0')}-${localMatch[1].padStart(2, '0')}`;
              }
            }
      
            if (!dateKey) return groups;
            if (!groups[dateKey]) groups[dateKey] = [];
            groups[dateKey].push(order);
            return groups;
          }, {});
        }, [orders]);
      
          const selectedDayOrders = (calendarOrdersByDate[selectedCalendarDate] || [])
              .slice()
              .sort((a, b) => {
                const getMinutes = (timeValue) => {
                  if (!timeValue) return 0;
                  const strTime = String(timeValue).trim();
                  const match = strTime.match(/T?(\d{1,2}):(\d{2})/);
                  if (match) {
                    return Number(match[1]) * 60 + Number(match[2]);
                  }
                  // Si no hace match pero tiene formato simple "HH:MM"
                  const parts = strTime.split(':');
                  if (parts.length >= 2) {
                    const h = Number(parts[0]);
                    const m = Number(parts[1]);
                    if (!isNaN(h) && !isNaN(m)) return h * 60 + m;
                  }
                  return 0;
                };
          
                return getMinutes(a.horaEntrega) - getMinutes(b.horaEntrega);
              });

      

  
  const calendarYear = calendarMonth.getFullYear();
    const calendarMonthIndex = calendarMonth.getMonth();
    
    const firstDayOffset =
      (new Date(calendarYear, calendarMonthIndex, 1).getDay() + 6) % 7;
    
    const daysInCalendarMonth =
      new Date(calendarYear, calendarMonthIndex + 1, 0).getDate();
    
    const calendarCells = [
      ...Array(firstDayOffset).fill(null),
      ...Array.from({ length: daysInCalendarMonth }, (_, i) => i + 1),
    ];
    
    const changeCalendarMonth = (amount) => {
      setCalendarMonth(current =>
        new Date(current.getFullYear(), current.getMonth() + amount, 1)
      );
    };
    
    
      const selectCalendarDay = (day) => {
        if (!day) return;
      
        const year = calendarMonth.getFullYear();
        const month = String(calendarMonth.getMonth() + 1).padStart(2, '0');
        const date = String(day).padStart(2, '0');
        const newDate = `${year}-${month}-${date}`;
      
        
        setSelectedCalendarDate(newDate);
      };


  

  // Guardar Cambios del Pedido Editado
  const handleSaveEditedOrder = async (e) => {
    e.preventDefault();
    if (!editingOrder) return;
    if (editingOrder.detalles.length === 0) return alert('El pedido debe tener al menos un producto');

    const subtotal = editingOrder.detalles.reduce((acc, d) => acc + (d.subtotal || 0), 0);
    const costoProduccion = editingOrder.detalles.reduce((acc, d) => acc + (d.costoProduccion || 0), 0);
    const delivery = editingOrder.tipoEntrega === 'Delivery' ? Number(editingOrder.costoDelivery || 0) : 0;
    const extras = editingOrder.llevaExtras ? Number(editingOrder.costoExtras || 0) : 0;
    const totalPedido = subtotal + delivery + extras;
    const gananciaNeta = totalPedido - costoProduccion;

    const updatedOrder = {
      ...editingOrder,
      costoDelivery: delivery,
      costoExtras: extras,
      totalPedido,
      costoProduccion,
      gananciaNeta
    };

    setOrders(prev => prev.map(o => o.idPedido === updatedOrder.idPedido ? updatedOrder : o));

    if (apiUrl) {
      try {
        await fetch(apiUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
          action: 'actualizarPedido',
          pedido: updatedOrder,
          detalles: updatedOrder.detalles
        })
        });
      } catch (err) {
        console.error('Error actualizando pedido en Sheets:', err);
      }
    }

    setEditingOrder(null);
  };

  // Auxiliares de edición de productos en el pedido
  const handleEditItemQty = (idx, delta) => {
    if (!editingOrder) return;
    const newDetalles = [...editingOrder.detalles];
    const item = newDetalles[idx];
    const newQty = item.cantidad + delta;
    if (newQty <= 0) {
      newDetalles.splice(idx, 1);
    } else {
      const costoUnitario = item.costoProduccion / item.cantidad || 0;
      item.cantidad = newQty;
      item.subtotal = item.precioUnitario * newQty;
      item.costoProduccion = costoUnitario * newQty;
    }
    setEditingOrder({ ...editingOrder, detalles: newDetalles });
  };

  const handleRemoveEditItem = (idx) => {
    if (!editingOrder) return;
    const newDetalles = [...editingOrder.detalles];
    newDetalles.splice(idx, 1);
    setEditingOrder({ ...editingOrder, detalles: newDetalles });
  };

  const handleAddProductToEditingOrder = () => {
    if (!selectedAddProduct || !editingOrder) return;
    const prod = products.find(p => p.id === selectedAddProduct);
    if (!prod) return;

    const existingIdx = editingOrder.detalles.findIndex(d => d.producto === prod.nombre);
    const newDetalles = [...editingOrder.detalles];

    if (existingIdx >= 0) {
      const item = newDetalles[existingIdx];
      item.cantidad += 1;
      item.subtotal = item.precioUnitario * item.cantidad;
      item.costoProduccion = prod.costo * item.cantidad;
    } else {
      newDetalles.push({
        producto: prod.nombre,
        categoria: prod.categoria,
        cantidad: 1,
        precioUnitario: prod.precio,
        subtotal: prod.precio,
        costoProduccion: prod.costo
      });
    }

    setEditingOrder({ ...editingOrder, detalles: newDetalles });
    setSelectedAddProduct('');
  };

  // Cambiar estado de pedido rápido
  const handleStatusChange = async (idPedido, newStatus) => {
    setOrders(prev => prev.map(o => o.idPedido === idPedido ? { ...o, estado: newStatus } : o));
    if (apiUrl) {
      try {
        await fetch(apiUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'actualizarEstado', idPedido, nuevoEstado: newStatus })
        });
      } catch (err) {
        console.error('Error actualizando estado en Sheets:', err);
      }
    }
  };


  // Guardar/Editar Producto Catálogo
  const handleSaveProduct = async (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const isEditing = Boolean(productModal.data);
    
        const nextId = `P${String(
          products.reduce((max, p) => {
            const match = String(p.id || '').match(/^P(\d+)$/);
            return match ? Math.max(max, Number(match[1])) : max;
          }, 0) + 1
        ).padStart(3, '0')}`;
    
        const prodData = {
          id: productModal.data?.id || nextId,
          nombre: String(formData.get('nombre') || '').trim(),
          categoria: String(formData.get('categoria') || ''),
          precio: Number(formData.get('precio') || 0),
          costo: Number(formData.get('costo') || 0),
          activo: formData.get('activo') === 'on'
        };
    
        if (!prodData.nombre) {
          alert('Por favor, ingresa el nombre del producto.');
          return;
        }
    
        if (!Number.isFinite(prodData.precio) ||
            !Number.isFinite(prodData.costo)) {
          alert('El precio y el costo deben ser números válidos.');
          return;
        }
    
        if (!apiUrl) {
          alert('No se encontró la URL de Apps Script.');
          return;
        }
    
        try {
          await fetch(apiUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
              'Content-Type': 'text/plain;charset=utf-8'
            },
            body: JSON.stringify({
              action: 'guardarProducto',
              producto: {
                id: prodData.id,
                nombre: prodData.nombre,
                categoria: prodData.categoria,
                precio: prodData.precio,
                costo: prodData.costo
              }
            })
          });
    
          // Actualizar la interfaz después de enviar la solicitud.
          setProducts(prev => {
            const exists = prev.some(p => p.id === prodData.id);
    
            const updated = exists
              ? prev.map(p => p.id === prodData.id ? prodData : p)
              : [...prev, prodData];
    
            localStorage.setItem('nova_products', JSON.stringify(updated));
            return updated;
          });
    
          setProductModal({ open: false, data: null });
    
          alert(
            isEditing
              ? 'Solicitud de actualización enviada.'
              : 'Solicitud de creación enviada.'
          );
    
        } catch (error) {
          console.error('Error enviando producto a Google Sheets:', error);
          alert('No se pudo enviar el producto. Revisa tu conexión e inténtalo de nuevo.');
        }
      };


  // Guardar Gasto
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!expenseForm.descripcion || !expenseForm.monto) return;
    const newExpense = {
      id: Date.now(),
      fecha: new Date().toISOString().split('T')[0],
      categoria: expenseForm.categoria,
      descripcion: expenseForm.descripcion,
      monto: Number(expenseForm.monto)
    };
    setExpenses(prev => [newExpense, ...prev]);
    setExpenseForm({ categoria: 'Ingredientes', descripcion: '', monto: '' });
  };

  // Pedidos ordenados cronológicamente
  const sortedUpcomingOrders = useMemo(() => {
    return [...orders]
      .filter(o => o.estado !== 'Cancelada')
      .sort((a, b) => {
        const dateA = new Date(`${a.fechaEntrega}T${a.horaEntrega || '00:00'}`);
        const dateB = new Date(`${b.fechaEntrega}T${b.horaEntrega || '00:00'}`);
        return dateA - dateB;
      });
  }, [orders]);

  // Resumen financiero
  const financials = useMemo(() => {
    const validOrders = orders.filter(o => o.estado !== 'Cancelada');
    const totalVentas = validOrders.reduce((acc, o) => acc + (o.totalPedido - o.costoDelivery), 0);
    const totalDelivery = validOrders.reduce((acc, o) => acc + o.costoDelivery, 0);
    const totalCostosProduccion = validOrders.reduce((acc, o) => acc + o.costoProduccion, 0);
    const totalGastosOperativos = expenses.reduce((acc, e) => acc + e.monto, 0);
    const gananciaNetaGlobal = (totalVentas + totalDelivery) - totalCostosProduccion - totalGastosOperativos;
    const rentabilidad = (totalVentas + totalDelivery) > 0 ? (gananciaNetaGlobal / (totalVentas + totalDelivery)) * 100 : 0;

    return { totalVentas, totalDelivery, totalCostosProduccion, totalGastosOperativos, gananciaNetaGlobal, rentabilidad };
  }, [orders, expenses]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCat = selectedCategory === 'Todos' || p.categoria === selectedCategory;
      const matchSearch = p.nombre.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAF6EF] text-[#4A3B32] font-sans">
      {/* Header / Navbar */}
      <header className="bg-[#4A3B32] text-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#D6BC80] p-2 rounded-full text-[#4A3B32]">
              <ChefHat size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none tracking-wide text-[#FAF6EF]">NOVA</h1>
              <p className="text-xs text-[#D6BC80] font-light">Dulces Creaciones</p>
            </div>
          </div>

          {/* Tab Navigation */}
          <nav className="flex flex-wrap gap-1 bg-[#3A2E27] p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('pos')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${activeTab === 'pos' ? 'bg-[#A56A41] text-white shadow' : 'text-[#D6BC80] hover:text-white'}`}
            >
              <Store size={16} /> Catálogo & Agenda
            </button>
            <button 
              onClick={() => setActiveTab('cart')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 relative ${activeTab === 'cart' ? 'bg-[#A56A41] text-white shadow' : 'text-[#D6BC80] hover:text-white'}`}
            >
              <ShoppingCart size={16} /> Carrito
              {cart.length > 0 && (
                <span className="bg-[#D6BC80] text-[#4A3B32] font-bold text-xs px-1.5 py-0.5 rounded-full">
                  {cart.reduce((a, c) => a + c.cantidad, 0)}
                </span>
              )}
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${activeTab === 'orders' ? 'bg-[#A56A41] text-white shadow' : 'text-[#D6BC80] hover:text-white'}`}
            >
              <FileText size={16} /> Pedidos
            </button>
            <button 
              onClick={() => setActiveTab('products')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${activeTab === 'products' ? 'bg-[#A56A41] text-white shadow' : 'text-[#D6BC80] hover:text-white'}`}
            >
              <Package size={16} /> Productos
            </button>
            <button 
              onClick={() => setActiveTab('finances')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${activeTab === 'finances' ? 'bg-[#A56A41] text-white shadow' : 'text-[#D6BC80] hover:text-white'}`}
            >
              <TrendingUp size={16} /> Finanzas
            </button>
            <button 
              onClick={() => setActiveTab('sheets')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${activeTab === 'sheets' ? 'bg-[#A56A41] text-white shadow' : 'text-[#D6BC80] hover:text-white'}`}
            >
              <Settings size={16} /> Google Sheets
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 md:p-6">

        {/* 1. CATÁLOGO POS Y CALENDARIO DE PEDIDOS */}
        {activeTab === 'pos' && (
          <div className="space-y-6">
            
            
            
            {/* SECCIÓN CALENDARIO Y AGENDA DE ENTREGAS */}
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#E8DCC4]">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <div className="flex items-center gap-2">
                  <CalendarIcon size={24} className="text-[#A56A41]" />
                  <div>
                    <h2 className="font-bold text-lg text-[#4A3B32]">
                      Calendario de Entregas
                    </h2>
                    <p className="text-xs text-gray-500">
                      Selecciona un día para consultar sus pedidos.
                    </p>
                  </div>
                </div>
            
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const today = new Date();
                      setCalendarMonth(new Date(today.getFullYear(), today.getMonth(), 1));
                      setSelectedCalendarDate(
                        `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
                      );
                    }}
                    className="px-3 py-2 rounded-lg border border-[#E8DCC4] text-sm font-semibold text-[#4A3B32] hover:bg-[#FAF6EF]"
                  >
                    Hoy
                  </button>
            
                  <button
                    onClick={() => changeCalendarMonth(-1)}
                    className="p-2 rounded-lg border border-[#E8DCC4] hover:bg-[#FAF6EF]"
                    aria-label="Mes anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>
            
                  <button
                    onClick={() => changeCalendarMonth(1)}
                    className="p-2 rounded-lg border border-[#E8DCC4] hover:bg-[#FAF6EF]"
                    aria-label="Mes siguiente"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            
              <h3 className="text-center font-bold text-[#4A3B32] text-lg mb-4 capitalize">
                {calendarMonth.toLocaleDateString('es-DO', {
                  month: 'long',
                  year: 'numeric',
                })}
              </h3>
            
              <div className="grid grid-cols-7 gap-1 sm:gap-2">
                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
                  <div
                    key={day}
                    className="text-center text-xs font-bold text-gray-500 py-2"
                  >
                    {day}
                  </div>
                ))}
            
                {calendarCells.map((day, index) => {
                  if (!day) {
                    return <div key={`empty-${index}`} />;
                  }
            
                  const dateKey =
                    `${calendarYear}-${String(calendarMonthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            
                  const dayOrders = calendarOrdersByDate[dateKey] || [];
                  const dayStatuses = [...new Set(dayOrders.map(order => order.estado))];
                  const isSelected = selectedCalendarDate === dateKey;
                  const isToday = dateKey ===
                    `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`;
            
                  return (
                    <button
                      key={dateKey}
                     onClick={() => {
                          console.log('Día seleccionado:', dateKey);
                          setSelectedCalendarDate(dateKey);
                        }}                  
                      className={`min-h-[66px] sm:min-h-[82px] rounded-xl border p-1 sm:p-2 flex flex-col items-center gap-1 transition-colors ${
                        isSelected
                          ? 'border-[#A56A41] ring-2 ring-[#A56A41]/30 bg-[#FAF0E4]'
                          : dayOrders.length
                            ? 'border-[#E8DCC4] hover:border-[#A56A41] bg-[#FFFCF7]'
                            : 'border-transparent hover:bg-[#FAF6EF]'
                      }`}
                      aria-label={`${day} de ${calendarMonth.toLocaleDateString('es-DO', { month: 'long' })}, ${dayOrders.length} pedidos`}
                    >
                      <span className={`text-sm font-bold ${
                        isToday ? 'bg-[#A56A41] text-white rounded-full w-7 h-7 flex items-center justify-center' : 'text-[#4A3B32]'
                      }`}>
                        {day}
                      </span>
            
                      {dayOrders.length > 0 && (
                        <>
                          <span className="text-[10px] font-semibold text-gray-600">
                            {dayOrders.length} {dayOrders.length === 1 ? 'pedido' : 'pedidos'}
                          </span>
            
                          <div className="flex flex-wrap justify-center gap-1">
                            {dayStatuses.map(status => {
                              const statusStyle =
                                STATUS_STYLES[status] || STATUS_STYLES['Por confirmar'];
            
                              return (
                                <span
                                  key={status}
                                  title={status}
                                  className={`w-2.5 h-2.5 rounded-full border ${statusStyle.bg} ${statusStyle.border}`}
                                />
                              );
                            })}
                          </div>
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            
              <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 pt-4 border-t border-[#E8DCC4]">
                {ESTADOS.map(status => {
                  const statusStyle =
                    STATUS_STYLES[status] || STATUS_STYLES['Por confirmar'];
            
                  return (
                    <div key={status} className="flex items-center gap-1.5 text-xs text-gray-600">
                      <span className={`w-3 h-3 rounded-full border ${statusStyle.bg} ${statusStyle.border}`} />
                      {status}
                    </div>
                  );
                })}
              </div>
            
              <div className="mt-6 pt-5 border-t border-[#E8DCC4]">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  
                  <h3 className="font-bold text-[#4A3B32]">
                    Entregas del {selectedCalendarDate.split('-').reverse().join('/')}                  
                  </h3>
                 <p className="text-xs text-red-600">
                      Fecha seleccionada: {selectedCalendarDate}
                    </p>
                    
                    <p className="text-xs text-red-600">
                      Pedidos encontrados: {selectedDayOrders.length}
                    </p>
                 

            
                  <span className="text-xs text-gray-500">
                    {selectedDayOrders.length} {selectedDayOrders.length === 1 ? 'pedido' : 'pedidos'}
                  </span>
                </div>
            
                {selectedDayOrders.length === 0 ? (
                  <div className="text-center py-8 bg-[#FAF6EF] rounded-xl">
                    <CalendarIcon size={30} className="mx-auto text-[#D6BC80] mb-2" />
                    <p className="font-semibold text-sm text-[#4A3B32]">
                      No hay pedidos para este día.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Selecciona otra fecha para consultar sus entregas.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {selectedDayOrders.map(order => {
                      const statusStyle =
                        STATUS_STYLES[order.estado] || STATUS_STYLES['Por confirmar'];
            
                      return (
                        <button
                          key={order.idPedido}
                          onClick={() => {
                            setActiveTab('orders');
                            startEditingOrder(order);
                          }}
                          className={`w-full text-left p-4 rounded-xl border ${statusStyle.bg} ${statusStyle.border} hover:shadow-md transition-all`}
                        >
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="font-bold font-mono text-sm text-[#4A3B32]">
                                  {order.idPedido}
                                </span>
                                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full border ${statusStyle.text} ${statusStyle.border} bg-white/70`}>
                                  {order.estado}
                                </span>
                              </div>
            
                              <p className="font-bold text-sm text-[#4A3B32] mt-2">
                                {order.cliente}
                              </p>
            
                              <p className="text-xs text-gray-600 mt-1">
                                <Clock size={13} className="inline mr-1" />
                                {formatTime12h(order.horaEntrega)}
                              </p>

                            </div>
            
                            <div className="text-right">
                              <p className="font-extrabold text-sm text-[#4A3B32]">
                                RD$ {Number(order.totalPedido || 0).toLocaleString('es-DO')}
                              </p>
                              <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#A56A41] mt-2">
                                Revisar pedido <ChevronRight size={14} />
                              </span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>





            

            {/* SECCIÓN CATÁLOGO + CARRITO LATERAL */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {/* Buscador & Categorías */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-[#E8DCC4] space-y-3">
                  <input 
                    type="text" 
                    placeholder="Buscar postre o bocadillo..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm bg-[#4A3B32] text-white focus:outline-none focus:ring-2 focus:ring-[#A56A41] placeholder-gray-300"
                  />
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIAS.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1 rounded-xl text-xs font-semibold transition-colors ${selectedCategory === cat ? 'bg-[#A56A41] text-white' : 'bg-[#FAF6EF] text-[#4A3B32] hover:bg-[#E8DCC4]'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grid de Productos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProducts.map(p => (
                    <div key={p.id} className="bg-white p-4 rounded-2xl shadow-sm border border-[#E8DCC4] flex flex-col justify-between hover:border-[#D6BC80] transition-colors">
                      <div>
                        <span className="text-[10px] font-bold text-[#A56A41] uppercase tracking-wider">{p.categoria}</span>
                        <h3 className="font-bold text-base text-[#4A3B32]">{p.nombre}</h3>
                        <p className="text-sm font-extrabold text-[#A56A41] mt-1">RD$ {p.precio.toLocaleString('es-DO', { minimumFractionDigits: 2 })}</p>
                      </div>
                      <button 
                        onClick={() => addToCart(p)}
                        className="mt-4 w-full bg-[#A56A41] hover:bg-[#8B5633] text-white font-medium py-2 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm"
                      >
                        <Plus size={16} /> Agregar al Carrito
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resumen rápido del Carrito */}
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#E8DCC4] h-fit sticky top-20">
                <h2 className="font-bold text-lg mb-4 flex items-center justify-between">
                  <span className="flex items-center gap-2"><ShoppingCart size={20} className="text-[#A56A41]" /> Carrito Activo</span>
                  <span className="text-xs font-normal text-gray-500">{cart.length} ítems</span>
                </h2>

                {cart.length === 0 ? (
                  <div className="py-8 text-center text-gray-400 text-sm">El carrito está vacío. Haz clic en los productos para agregarlos.</div>
                ) : (
                  <div className="space-y-3">
                    <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                      {cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-sm border-b pb-2">
                          <div className="flex-1 pr-2">
                            <p className="font-medium text-[#4A3B32] leading-tight">{item.nombre}</p>
                            <p className="text-xs text-gray-500">RD$ {item.precio} x {item.cantidad}</p>
                          </div>
                          <div className="flex items-center gap-1 bg-[#FAF6EF] rounded-lg p-1">
                            <button onClick={() => updateCartQty(item.id, -1)} className="w-6 h-6 flex items-center justify-center font-bold text-[#A56A41] hover:bg-gray-200 rounded">-</button>
                            <span className="w-6 text-center text-xs font-bold">{item.cantidad}</span>
                            <button onClick={() => updateCartQty(item.id, 1)} className="w-6 h-6 flex items-center justify-center font-bold text-[#A56A41] hover:bg-gray-200 rounded">+</button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-3 space-y-1 text-sm">
                      <div className="flex justify-between font-bold text-base text-[#4A3B32]">
                        <span>Subtotal:</span>
                        <span>RD$ {cartTotals.subtotal.toLocaleString('es-DO', { minimumFractionDigits: 2 })}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setActiveTab('cart')}
                      className="w-full mt-2 bg-[#D6BC80] hover:bg-[#C2A76B] text-[#4A3B32] font-bold py-2.5 rounded-xl transition-colors text-center text-sm"
                    >
                      Ir a Completar Pedido →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 2. PANTALLA CARRITO & CHECKOUT */}
        {activeTab === 'cart' && (
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-sm border border-[#E8DCC4]">
            <h2 className="font-bold text-xl mb-6 flex items-center gap-2 text-[#4A3B32]">
              <ShoppingCart size={24} className="text-[#A56A41]" /> Finalizar Pedido
            </h2>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No tienes productos en el carrito.</p>
                <button onClick={() => setActiveTab('pos')} className="bg-[#A56A41] text-white px-4 py-2 rounded-xl text-sm">Volver al Catálogo</button>
              </div>
            ) : (
              <form onSubmit={handleCreateOrder} className="space-y-6">
                {/* Lista de ítems */}
                <div className="border rounded-xl p-4 bg-[#FAF6EF] space-y-3">
                  <h3 className="font-bold text-sm text-[#4A3B32]">Detalle de Productos</h3>
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm bg-white p-3 rounded-lg shadow-sm">
                      <div>
                        <p className="font-semibold">{item.nombre}</p>
                        <p className="text-xs text-gray-500">RD$ {item.precio} x {item.cantidad} = RD$ {(item.precio * item.cantidad).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border rounded-lg">
                          <button type="button" onClick={() => updateCartQty(item.id, -1)} className="px-2 py-1 text-[#A56A41] font-bold">-</button>
                          <span className="px-2 font-bold text-xs">{item.cantidad}</span>
                          <button type="button" onClick={() => updateCartQty(item.id, 1)} className="px-2 py-1 text-[#A56A41] font-bold">+</button>
                        </div>
                        <button type="button" onClick={() => updateCartQty(item.id, -item.cantidad)} className="text-red-500 hover:text-red-700">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Formulario Cliente */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Nombre Cliente *</label>
                    <input 
                      type="text" 
                      required
                      value={checkoutForm.cliente} 
                      onChange={e => setCheckoutForm({ ...checkoutForm, cliente: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 text-sm bg-[#4A3B32] text-white font-medium focus:ring-2 focus:ring-[#A56A41] placeholder-gray-300"
                      placeholder="Ej. María Pérez"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Teléfono</label>
                    <input 
                      type="text" 
                      value={checkoutForm.telefono} 
                      onChange={e => setCheckoutForm({ ...checkoutForm, telefono: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 text-sm bg-[#4A3B32] text-white font-medium focus:ring-2 focus:ring-[#A56A41] placeholder-gray-300"
                      placeholder="Ej. 809-555-0199"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Tipo de Entrega</label>
                    <select 
                      value={checkoutForm.tipoEntrega} 
                      onChange={e => setCheckoutForm({ ...checkoutForm, tipoEntrega: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 text-sm bg-[#4A3B32] text-white font-semibold focus:ring-2 focus:ring-[#A56A41]"
                    >
                      <option value="Retiro en Tienda">Retiro en Tienda</option>
                      <option value="Delivery">Delivery</option>
                    </select>
                  </div>
                  {checkoutForm.tipoEntrega === 'Delivery' && (
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Costo Delivery (DOP)</label>
                      <input 
                        type="number" 
                        value={checkoutForm.costoDelivery} 
                        onChange={e => setCheckoutForm({ ...checkoutForm, costoDelivery: e.target.value })}
                        className="w-full p-2.5 rounded-xl border border-gray-300 text-sm bg-[#4A3B32] text-white font-medium focus:ring-2 focus:ring-[#A56A41] placeholder-gray-300"
                        placeholder="Ej. 200"
                      />
                    </div>
                  )}

                  {/* SECCIÓN EXTRAS */}
                  <div className="md:col-span-2 bg-[#FAF6EF] p-4 rounded-xl border border-[#D6BC80] space-y-3">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox"
                        id="llevaExtrasCheck"
                        checked={checkoutForm.llevaExtras}
                        onChange={e => setCheckoutForm({ ...checkoutForm, llevaExtras: e.target.checked })}
                        className="w-4 h-4 accent-[#A56A41]"
                      />
                      <label htmlFor="llevaExtrasCheck" className="text-sm font-bold text-[#4A3B32] flex items-center gap-1 cursor-pointer">
                        <Sparkles size={16} className="text-[#A56A41]" /> ¿El pedido lleva extras? (Toppers, velitas, empaques especiales, etc.)
                      </label>
                    </div>

                    {checkoutForm.llevaExtras && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                        <div className="md:col-span-2">
                          <label className="block text-xs font-bold text-gray-700 mb-1">Detalle de los Extras</label>
                          <input 
                            type="text" 
                            value={checkoutForm.detallesExtras}
                            onChange={e => setCheckoutForm({ ...checkoutForm, detallesExtras: e.target.value })}
                            placeholder="Ej. Topper de Feliz Cumpleaños y 2 velitas doradas"
                            className="w-full p-2.5 rounded-xl border border-gray-300 text-sm bg-[#4A3B32] text-white font-medium placeholder-gray-300"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">Precio Extras (DOP)</label>
                          <input 
                            type="number" 
                            value={checkoutForm.costoExtras}
                            onChange={e => setCheckoutForm({ ...checkoutForm, costoExtras: e.target.value })}
                            placeholder="Ej. 250"
                            className="w-full p-2.5 rounded-xl border border-gray-300 text-sm bg-[#4A3B32] text-white font-medium placeholder-gray-300"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Fecha Entrega</label>
                    <input 
                      type="date" 
                      value={checkoutForm.fechaEntrega} 
                      onChange={e => setCheckoutForm({ ...checkoutForm, fechaEntrega: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 text-sm bg-[#4A3B32] text-white font-semibold focus:ring-2 focus:ring-[#A56A41] [color-scheme:dark]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Hora Entrega: <span className="text-[#A56A41] font-bold">({formatTime12h(checkoutForm.horaEntrega)})</span>
                    </label>
                    <input 
                      type="time" 
                      value={checkoutForm.horaEntrega} 
                      onChange={e => setCheckoutForm({ ...checkoutForm, horaEntrega: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 text-sm bg-[#4A3B32] text-white font-semibold focus:ring-2 focus:ring-[#A56A41] [color-scheme:dark]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Método de Pago</label>
                    <select 
                      value={checkoutForm.metodoPago} 
                      onChange={e => setCheckoutForm({ ...checkoutForm, metodoPago: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 text-sm bg-[#4A3B32] text-white font-semibold focus:ring-2 focus:ring-[#A56A41]"
                    >
                      {METODOS_PAGO.map(m => <option key={m} value={m}>{m}</option>)}
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 mb-1">Dirección / Notas / Sabor de Relleno</label>
                    <textarea 
                      rows="2"
                      value={checkoutForm.direccionNotas} 
                      onChange={e => setCheckoutForm({ ...checkoutForm, direccionNotas: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-gray-300 text-sm bg-[#4A3B32] text-white font-medium focus:ring-2 focus:ring-[#A56A41] placeholder-gray-300"
                      placeholder="Detalles del bizcocho, dedicatoria o dirección..."
                    />
                  </div>
                </div>

                {/* Totales */}
                <div className="bg-[#FAF6EF] p-4 rounded-xl space-y-2 border border-[#E8DCC4]">
                  <div className="flex justify-between text-sm"><span>Subtotal Productos:</span><span>RD$ {cartTotals.subtotal.toLocaleString('es-DO', { minimumFractionDigits: 2 })}</span></div>
                  {checkoutForm.tipoEntrega === 'Delivery' && (
                    <div className="flex justify-between text-sm"><span>Delivery:</span><span>RD$ {cartTotals.delivery.toLocaleString('es-DO', { minimumFractionDigits: 2 })}</span></div>
                  )}
                  {checkoutForm.llevaExtras && (
                    <div className="flex justify-between text-sm text-amber-900 font-semibold"><span>Extras:</span><span>RD$ {cartTotals.extras.toLocaleString('es-DO', { minimumFractionDigits: 2 })}</span></div>
                  )}
                  <div className="flex justify-between text-lg font-bold text-[#4A3B32] border-t pt-2">
                    <span>Total a Cobrar:</span>
                    <span className="text-[#A56A41]">RD$ {cartTotals.total.toLocaleString('es-DO', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#A56A41] hover:bg-[#8B5633] text-white font-bold py-3 rounded-xl shadow transition-colors flex items-center justify-center gap-2 text-base"
                >
                  <CheckCircle size={20} /> Registrar Pedido e Imprimir Recibo
                </button>
              </form>
            )}
          </div>
        )}

        {/* 3. CONTROL DE PEDIDOS */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <h2 className="font-bold text-xl text-[#4A3B32]">Registro de Pedidos (POS)</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8DCC4] overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#4A3B32] text-white">
                    <th className="p-3">ID Pedido</th>
                    <th className="p-3">Cliente</th>
                    <th className="p-3">Fecha y Hora Entrega</th>
                    <th className="p-3">Tipo</th>
                    <th className="p-3">Extras</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Estado</th>
                    <th className="p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.length === 0 ? (
                    <tr><td colSpan="8" className="p-6 text-center text-gray-400">No hay pedidos registrados.</td></tr>
                  ) : (
                    orders.map(o => {
                      const style = STATUS_STYLES[o.estado] || STATUS_STYLES['Por confirmar'];
                      return (
                        <tr key={o.idPedido} className="hover:bg-gray-50">
                          <td className="p-3 font-bold text-[#A56A41]">{o.idPedido}</td>
                          <td className="p-3 font-medium">{o.cliente}</td>
                          <td className="p-3 font-semibold text-gray-700">{o.fechaEntrega} — {formatTime12h(o.horaEntrega)}</td>
                          <td className="p-3">{o.tipoEntrega}</td>
                          <td className="p-3 text-xs">
                            {o.llevaExtras ? (
                              <span className="text-amber-800 font-semibold" title={o.detallesExtras}>
                                Sí (+RD${o.costoExtras})
                              </span>
                            ) : (
                              <span className="text-gray-400">No</span>
                            )}
                          </td>
                          <td className="p-3 font-bold">RD$ {o.totalPedido.toLocaleString()}</td>
                          <td className="p-3">
                            <select 
                              value={o.estado}
                              onChange={(e) => handleStatusChange(o.idPedido, e.target.value)}
                              className={`px-2 py-1 rounded-lg text-xs font-semibold border ${style.bg} ${style.text} ${style.border} focus:outline-none`}
                            >
                              {ESTADOS.map(st => <option key={st} value={st}>{st}</option>)}
                            </select>
                          </td>
                          <td className="p-3 flex items-center gap-2">
                            <button 
                              onClick={() => startEditingOrder(o)}
                              className="p-1.5 bg-[#FAF6EF] text-blue-700 rounded-lg hover:bg-blue-100"
                              title="Editar Pedido"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => setSelectedOrderReceipt(o)}
                              className="p-1.5 bg-[#FAF6EF] text-[#4A3B32] rounded-lg hover:bg-[#E8DCC4]"
                              title="Imprimir Recibo"
                            >
                              <Printer size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. GESTIÓN DE PRODUCTOS (CRUD) */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-xl text-[#4A3B32]">Catálogo de Productos</h2>
              <button 
                onClick={() => setProductModal({ open: true, data: null })}
                className="bg-[#A56A41] text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
              >
                <Plus size={16} /> Nuevo Producto
              </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#E8DCC4] overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-[#4A3B32] text-white">
                    <th className="p-3">ID</th>
                    <th className="p-3">Producto</th>
                    <th className="p-3">Categoría</th>
                    <th className="p-3">Precio (DOP)</th>
                    <th className="p-3">Costo (DOP)</th>
                    <th className="p-3">Margen %</th>
                    <th className="p-3">Estado</th>
                    <th className="p-3">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map(p => {
                    const margen = p.precio > 0 ? ((p.precio - p.costo) / p.precio) * 100 : 0;
                    return (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="p-3 font-mono text-xs">{p.id}</td>
                        <td className="p-3 font-semibold">{p.nombre}</td>
                        <td className="p-3 text-xs text-gray-500">{p.categoria}</td>
                        <td className="p-3 font-bold">RD$ {p.precio}</td>
                        <td className="p-3 text-gray-600">RD$ {p.costo}</td>
                        <td className="p-3 font-semibold text-green-600">{margen.toFixed(1)}%</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${p.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {p.activo ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="p-3">
                          <button 
                            onClick={() => setProductModal({ open: true, data: p })}
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <Edit size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. FINANZAS & GASTOS */}
        {activeTab === 'finances' && (
          <div className="space-y-6">
            <h2 className="font-bold text-xl text-[#4A3B32]">Resumen Financiero Global</h2>
            
            {/* Cards KPI */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-[#E8DCC4] shadow-sm">
                <p className="text-xs text-gray-500 font-bold">Ventas Totales</p>
                <p className="text-xl font-extrabold text-[#4A3B32]">RD$ {financials.totalVentas.toLocaleString()}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#E8DCC4] shadow-sm">
                <p className="text-xs text-gray-500 font-bold">Costo de Materia Prima</p>
                <p className="text-xl font-extrabold text-orange-600">RD$ {financials.totalCostosProduccion.toLocaleString()}</p>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#E8DCC4] shadow-sm">
                <p className="text-xs text-gray-500 font-bold">Gastos Operativos</p>
                <p className="text-xl font-extrabold text-red-600">RD$ {financials.totalGastosOperativos.toLocaleString()}</p>
              </div>
              <div className="bg-[#D9EAD3] p-4 rounded-2xl border border-green-300 shadow-sm">
                <p className="text-xs text-green-800 font-bold">Ganancia Neta Global</p>
                <p className="text-xl font-extrabold text-green-900">RD$ {financials.gananciaNetaGlobal.toLocaleString()}</p>
                <p className="text-[10px] text-green-700 font-semibold mt-1">Rentabilidad: {financials.rentabilidad.toFixed(1)}%</p>
              </div>
            </div>

            {/* Registrar Gasto */}
            <div className="bg-white p-5 rounded-2xl border border-[#E8DCC4] shadow-sm">
              <h3 className="font-bold text-base text-[#4A3B32] mb-3">Registrar Nuevo Gasto Operativo</h3>
              <form onSubmit={handleAddExpense} className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <select 
                  value={expenseForm.categoria}
                  onChange={e => setExpenseForm({ ...expenseForm, categoria: e.target.value })}
                  className="p-2 border rounded-xl text-sm bg-[#4A3B32] text-white font-semibold"
                >
                  {CATEGORIAS_GASTO.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input 
                  type="text" 
                  placeholder="Descripción del gasto..."
                  value={expenseForm.descripcion}
                  onChange={e => setExpenseForm({ ...expenseForm, descripcion: e.target.value })}
                  className="p-2 border rounded-xl text-sm bg-[#4A3B32] text-white font-medium placeholder-gray-300"
                />
                <input 
                  type="number" 
                  placeholder="Monto (DOP)..."
                  value={expenseForm.monto}
                  onChange={e => setExpenseForm({ ...expenseForm, monto: e.target.value })}
                  className="p-2 border rounded-xl text-sm bg-[#4A3B32] text-white font-medium placeholder-gray-300"
                />
                <button type="submit" className="bg-[#A56A41] text-white rounded-xl text-sm font-bold py-2">Guardar Gasto</button>
              </form>
            </div>
          </div>
        )}

        {/* 6. GOOGLE SHEETS SYNC */}
        {activeTab === 'sheets' && (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl border border-[#E8DCC4] shadow-sm space-y-4">
            <h2 className="font-bold text-xl text-[#4A3B32] flex items-center gap-2">
              <Settings size={20} className="text-[#A56A41]" /> Conector con Google Sheets
            </h2>
            <p className="text-sm text-gray-600">Pega aquí el enlace de la Aplicación Web generada en Google Apps Script (`/exec`) para sincronizar pedidos y catálogo en la nube.</p>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">URL de la API / Webhook</label>
              <input 
                type="text" 
                value={apiUrl}
                onChange={e => setApiUrl(e.target.value)}
                placeholder="https://script.google.com/macros/s/.../exec"
                className="w-full p-2.5 border rounded-xl text-xs font-mono bg-[#4A3B32] text-white font-medium"
              />
            </div>

            <button 
              onClick={() => alert('URL guardada en la aplicación local.')}
              className="bg-[#A56A41] text-white px-4 py-2 rounded-xl text-sm font-bold"
            >
              Guardar Configuración
            </button>
          </div>
        )}

      </main>

      {/* MODAL MODIFICAR / EDITAR PEDIDO COMPLETO */}
      {editingOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h3 className="font-bold text-lg text-[#4A3B32] flex items-center gap-2">
                <Edit size={20} className="text-[#A56A41]" /> Modificar Pedido: <span className="font-mono text-[#A56A41]">{editingOrder.idPedido}</span>
              </h3>
              <button onClick={() => setEditingOrder(null)} className="text-gray-400 hover:text-black"><X size={20} /></button>
            </div>

            <form onSubmit={handleSaveEditedOrder} className="space-y-5">
              {/* Productos en el Pedido */}
              <div className="bg-[#FAF6EF] p-4 rounded-xl border border-[#E8DCC4] space-y-3">
                <h4 className="font-bold text-sm text-[#4A3B32]">Productos del Pedido</h4>
                {editingOrder.detalles.map((d, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex-1 pr-2">
                      <p className="font-semibold text-gray-800">{d.producto}</p>
                      <p className="text-xs text-gray-500">RD$ {d.precioUnitario} c/u = RD$ {(d.subtotal).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded-lg bg-gray-50">
                        <button type="button" onClick={() => handleEditItemQty(idx, -1)} className="px-2 py-1 text-[#A56A41] font-bold">-</button>
                        <span className="px-2 font-bold text-xs">{d.cantidad}</span>
                        <button type="button" onClick={() => handleEditItemQty(idx, 1)} className="px-2 py-1 text-[#A56A41] font-bold">+</button>
                      </div>
                      <button type="button" onClick={() => handleRemoveEditItem(idx)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Agregar Nuevo Producto al Pedido */}
                <div className="flex gap-2 pt-2">
                  <select 
                    value={selectedAddProduct}
                    onChange={e => setSelectedAddProduct(e.target.value)}
                    className="flex-1 p-2 border rounded-xl text-xs bg-[#4A3B32] text-white font-semibold"
                  >
                    <option value="">-- Agregar otro producto del catálogo --</option>
                    {products.map(p => <option key={p.id} value={p.id}>{p.nombre} (RD$ {p.precio})</option>)}
                  </select>
                  <button 
                    type="button"
                    onClick={handleAddProductToEditingOrder}
                    className="bg-[#A56A41] text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1"
                  >
                    <Plus size={14} /> Añadir
                  </button>
                </div>
              </div>

              {/* Datos Generales del Pedido */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Cliente</label>
                  <input 
                    type="text" required 
                    value={editingOrder.cliente}
                    onChange={e => setEditingOrder({ ...editingOrder, cliente: e.target.value })}
                    className="w-full p-2 border rounded-xl bg-[#4A3B32] text-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Teléfono</label>
                  <input 
                    type="text" 
                    value={editingOrder.telefono}
                    onChange={e => setEditingOrder({ ...editingOrder, telefono: e.target.value })}
                    className="w-full p-2 border rounded-xl bg-[#4A3B32] text-white font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Tipo Entrega</label>
                  <select 
                    value={editingOrder.tipoEntrega}
                    onChange={e => setEditingOrder({ ...editingOrder, tipoEntrega: e.target.value })}
                    className="w-full p-2 border rounded-xl bg-[#4A3B32] text-white font-semibold"
                  >
                    <option value="Retiro en Tienda">Retiro en Tienda</option>
                    <option value="Delivery">Delivery</option>
                  </select>
                </div>
                {editingOrder.tipoEntrega === 'Delivery' && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Costo Delivery (DOP)</label>
                    <input 
                      type="number" 
                      value={editingOrder.costoDelivery}
                      onChange={e => setEditingOrder({ ...editingOrder, costoDelivery: Number(e.target.value) })}
                      className="w-full p-2 border rounded-xl bg-[#4A3B32] text-white font-medium"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Fecha Entrega</label>
                  <input 
                    type="date" 
                    value={editingOrder.fechaEntrega}
                    onChange={e => setEditingOrder({ ...editingOrder, fechaEntrega: e.target.value })}
                    className="w-full p-2 border rounded-xl bg-[#4A3B32] text-white font-semibold [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Hora Entrega ({formatTime12h(editingOrder.horaEntrega)})</label>
                  <input 
                    type="time" 
                    value={editingOrder.horaEntrega}
                    onChange={e => setEditingOrder({ ...editingOrder, horaEntrega: e.target.value })}
                    className="w-full p-2 border rounded-xl bg-[#4A3B32] text-white font-semibold [color-scheme:dark]"
                  />
                </div>

                {/* Modificar Extras */}
                <div className="md:col-span-2 bg-[#FAF6EF] p-3 rounded-xl border border-[#D6BC80] space-y-2">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox"
                      id="editLlevaExtras"
                      checked={editingOrder.llevaExtras}
                      onChange={e => setEditingOrder({ ...editingOrder, llevaExtras: e.target.checked })}
                      className="w-4 h-4 accent-[#A56A41]"
                    />
                    <label htmlFor="editLlevaExtras" className="text-xs font-bold text-[#4A3B32]">¿Lleva Extras?</label>
                  </div>
                  {editingOrder.llevaExtras && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      <input 
                        type="text" 
                        placeholder="Detalles de extras..."
                        value={editingOrder.detallesExtras}
                        onChange={e => setEditingOrder({ ...editingOrder, detallesExtras: e.target.value })}
                        className="md:col-span-2 p-2 border rounded-lg text-xs bg-[#4A3B32] text-white font-medium placeholder-gray-300"
                      />
                      <input 
                        type="number" 
                        placeholder="Monto Extras (DOP)"
                        value={editingOrder.costoExtras}
                        onChange={e => setEditingOrder({ ...editingOrder, costoExtras: Number(e.target.value) })}
                        className="p-2 border rounded-lg text-xs bg-[#4A3B32] text-white font-medium placeholder-gray-300"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Estado del Pedido</label>
                  <select 
                    value={editingOrder.estado}
                    onChange={e => setEditingOrder({ ...editingOrder, estado: e.target.value })}
                    className="w-full p-2 border rounded-xl font-bold bg-[#4A3B32] text-white"
                  >
                    {ESTADOS.map(st => <option key={st} value={st}>{st}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Método de Pago</label>
                  <select 
                    value={editingOrder.metodoPago}
                    onChange={e => setEditingOrder({ ...editingOrder, metodoPago: e.target.value })}
                    className="w-full p-2 border rounded-xl bg-[#4A3B32] text-white font-semibold"
                  >
                    {METODOS_PAGO.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Dirección / Notas</label>
                  <textarea 
                    rows="2"
                    value={editingOrder.direccionNotas}
                    onChange={e => setEditingOrder({ ...editingOrder, direccionNotas: e.target.value })}
                    className="w-full p-2 border rounded-xl text-xs bg-[#4A3B32] text-white font-medium placeholder-gray-300"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3 border-t">
                <button 
                  type="button" 
                  onClick={() => setEditingOrder(null)} 
                  className="w-1/2 py-2.5 border rounded-xl font-bold text-gray-600 hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="w-1/2 py-2.5 bg-[#A56A41] text-white rounded-xl font-bold hover:bg-[#8B5633]"
                >
                  Guardar Cambios del Pedido
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL CREAR / EDITAR PRODUCTO */}
      {productModal.open && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">{productModal.data ? 'Editar Producto' : 'Nuevo Producto'}</h3>
              <button onClick={() => setProductModal({ open: false, data: null })}><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveProduct} className="space-y-3 text-sm">
              <div>
                <label className="block text-xs font-bold mb-1">Nombre Producto</label>
                <input name="nombre" defaultValue={productModal.data?.nombre || ''} required className="w-full p-2 border rounded-lg bg-[#4A3B32] text-white font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Categoría</label>
                <select name="categoria" defaultValue={productModal.data?.categoria || 'Enteros'} className="w-full p-2 border rounded-lg bg-[#4A3B32] text-white font-semibold">
                  {CATEGORIAS.filter(c => c !== 'Todos').map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold mb-1">Precio Venta (DOP)</label>
                  <input name="precio" type="number" defaultValue={productModal.data?.precio || ''} required className="w-full p-2 border rounded-lg bg-[#4A3B32] text-white font-medium" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Costo Estimado (DOP)</label>
                  <input name="costo" type="number" defaultValue={productModal.data?.costo || ''} required className="w-full p-2 border rounded-lg bg-[#4A3B32] text-white font-medium" />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input name="activo" type="checkbox" defaultChecked={productModal.data?.activo ?? true} id="activoCheck" />
                <label htmlFor="activoCheck" className="text-xs font-bold">Producto Activo en Menú</label>
              </div>
              <button type="submit" className="w-full bg-[#A56A41] text-white py-2.5 rounded-xl font-bold mt-4">Guardar Producto</button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL / FACTURA RECIBO IMPRIMIBLE */}
      {selectedOrderReceipt && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl relative">
            <button onClick={() => setSelectedOrderReceipt(null)} className="absolute top-4 right-4 text-gray-400 hover:text-black"><X size={20} /></button>
            
            <div id="thermal-receipt" className="text-center font-mono text-xs space-y-2 py-2">
              <div className="border-b pb-2">
                <h2 className="font-bold text-base tracking-widest">NOVA DULCES CREACIONES</h2>
                <p>Repostería & Eventos</p>
                <p>Santiago, Rep. Dom.</p>
              </div>

              <div className="text-left py-2 border-b space-y-1">
                <p><strong>Pedido:</strong> {selectedOrderReceipt.idPedido}</p>
                <p><strong>Cliente:</strong> {selectedOrderReceipt.cliente}</p>
                <p><strong>Tel:</strong> {selectedOrderReceipt.telefono || 'N/A'}</p>
                <p><strong>Entrega:</strong> {selectedOrderReceipt.fechaEntrega} — {formatTime12h(selectedOrderReceipt.horaEntrega)}</p>
                <p><strong>Tipo:</strong> {selectedOrderReceipt.tipoEntrega}</p>
              </div>

              <table className="w-full text-left my-2">
                <thead>
                  <tr className="border-b">
                    <th>Cant</th>
                    <th>Producto</th>
                    <th className="text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrderReceipt.detalles?.map((d, idx) => (
                    <tr key={idx}>
                      <td>{d.cantidad}x</td>
                      <td>{d.producto}</td>
                      <td className="text-right">RD${d.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="border-t pt-2 text-right space-y-1">
                {selectedOrderReceipt.costoDelivery > 0 && <p>Delivery: RD$ {selectedOrderReceipt.costoDelivery}</p>}
                {selectedOrderReceipt.llevaExtras && (
                  <div className="text-left border-t border-b py-1 my-1">
                    <p className="font-bold">Extras ({selectedOrderReceipt.detallesExtras}):</p>
                    <p className="text-right font-bold">RD$ {selectedOrderReceipt.costoExtras}</p>
                  </div>
                )}
                <p className="font-bold text-sm">TOTAL: RD$ {selectedOrderReceipt.totalPedido}</p>
                <p className="text-[10px]">Pago: {selectedOrderReceipt.metodoPago}</p>
              </div>

              <div className="border-t pt-2 text-center text-[10px]">
                <p>¡Gracias por endulzar tus momentos con nosotros!</p>
              </div>
            </div>

            <button 
              onClick={() => window.print()} 
              className="w-full mt-4 bg-[#4A3B32] text-white font-bold py-2 rounded-xl flex items-center justify-center gap-2 text-sm"
            >
              <Printer size={16} /> Imprimir Recibo
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
