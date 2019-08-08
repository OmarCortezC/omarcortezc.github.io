Vue.component('v-pagination', window['vue-plain-pagination'])

var app = new Vue({
    el: "#app",
    data () {
        return {
            tituloRazas: "Razas de Perro",
            tituloSubRazas: "Sub Razas de Perro",
            tituloImagenesRazas: "Imagenes de Raza: ",
            
            textoBusqueda: "",
            razaSeleccionada: "",
            textoBusquedaSubRaza: "",
            
            listadoRazasAPI: [],
            listadoRazas: [],
            listadoSubRazas: [],
            listadoImagenesRazas: [],

            currentPage: 1,
            pageSize: 10,
        }
    },
    methods: {
        obtenerImagenesRazas: function () {
            axios
                .get("https://dog.ceo/api/breed/" + this.razaSeleccionada + "/images")
                .then(response => { this.listadoImagenesRazas = response.data.message })
        },
        seleccionarRaza: function (item) {
            this.razaSeleccionada = item;
            this.listadoSubRazas = this.listadoRazasAPI[item];
            this.obtenerImagenesRazas();
        },
    },
    computed: {
        obtenerRazas: function () {
            if (this.textoBusqueda.trim() !== "") {
                this.currentPage = 1;

                return this.listadoRazas
                    .filter(item => item.trim().toLowerCase().indexOf(this.textoBusqueda.trim().toLowerCase()) > -1)
                    .filter((row, index) => {
                        var start = ((((this.currentPage === 0 ? 1 : this.currentPage) * this.pageSize) - this.pageSize));
                        var end = ((this.currentPage === 0 ? 1 : this.currentPage) * this.pageSize);
                        return (index >= start && index < end);
                    });
                }
            else
                return this.listadoRazas
                    .filter((row, index) => {
                        var start = (((this.currentPage === 0 ? 1 : this.currentPage) * this.pageSize) - this.pageSize);
                        var end = (this.currentPage === 0 ? 1 : this.currentPage) * this.pageSize;
                        return (index >= start && index < end);
                    });
        },
        obtenerCantidadPagines: function () {
            return this.listadoRazas
                .filter((row, index) => {
                    var start = (((this.currentPage === 0 ? 1 : this.currentPage) * this.pageSize) - this.pageSize);
                    var end = (this.currentPage === 0 ? 1 : this.currentPage) * this.pageSize;
                    return (index >= start && index < end);
                }).length;
        }

    },
    mounted () {
      axios
        .get("https://dog.ceo/api/breeds/list/all")
        .then(response => { 
            this.listadoRazas = Object.keys(response.data.message); 
            this.listadoRazasAPI = response.data.message; 
        })
    }
})
