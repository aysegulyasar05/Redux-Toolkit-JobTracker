import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    //buraya filtrenenleri aktar
    jobs: [],

    //bu dizi ic degismeyecek
    mainJobs: [],

    //is verileri yüklendi mi
    initialized: false,
    //hata olustu mu?
    isError: false,
};
const jobSlice = createSlice({
    name: "jobs",
    initialState,
    reducers: {
        setJobs: (state, action) => {
            state.jobs = action.payload;
            state.mainJobs = action.payload;
            state.initialized = true;//yüklenme yapildi bitti ve veriler dogru geldi
            state.isError = false;
        },
        setError: (state) => {
            state.initialized = true; //yüklenme yapildi bitti ve veriler yanlis geldi
            state.isError = true;
        },

        addJob: (state, action) => {
            state.jobs.push(action.payload)

        },
        filterBySearch: (state, action) => {
            //arama terimini kücük harfe cevirme
            const query = action.payload.toLowerCase();
            //arama terimi ile eslesen butun isleri filtrele

            const filter = state.mainJobs.filter((job) => job.company.toLowerCase().includes(query))
            // statei güncelleme
            state.jobs = filter;
        },

        filterByStatus: (state, action) => {
            //geln duruma sahip butun isleri filtreleme
            const filtered = state.mainJobs.filter((job) => job.status === action.payload);

            state.jobs = filtered;
        },

        filterByType: (state, action) => {
            state.jobs = state.mainJobs.filter((job) =>
                job.type === action.payload);


        },

        filterBySort: (state, action) => {

            switch (action.payload) {
                case 'a-z':
                    state.jobs.sort((a, b) =>
                        a.company.localeCompare(b.company)
                    );
                    break;
                case 'z-a':
                    state.jobs.sort((a, b) =>
                        b.company.localeCompare(a.company)
                    );
                    break;
                case 'Newest':
                    state.jobs.sort(
                        (a, b) => new Date(b.date) - new Date(a.date)
                    );
                    break;
                case 'Oldest':
                case 'En Eski':
                    state.jobs.sort(
                        (a, b) => new Date(a.date) - new Date(b.date)
                    );
                    break;
                default:
                    return state;
            }
         

        },

        clearFilters: (state) => {
            state.jobs = state.mainJobs;
        }
    },

});

export const { setJobs, setError, addJob, filterBySearch, filterByStatus, filterByType, filterBySort, clearFilters } = jobSlice.actions;

export default jobSlice.reducer;