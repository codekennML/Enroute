import { api } from './apiSlice';

// Define interfaces for request payloads and query parameters
interface Inspection {
    provider: string;
    issueDate: Date;
    expiryDate: Date;
    image: {
        front: string;
        back?: string;
    };
}

interface Insurance {
    provider: string;
    issueDate: Date;
    expiryDate: Date;
    image: {
        front: string;
        back?: string;
    };
}

interface Vehicle {
    vehicleModel: string;
    vehicleMake: string;
    inspection: Inspection;
    insurance: Insurance;
    licensePlate: string;
    image: Record<string, string>[];
    year: number;
    hasAC: boolean;
    driverId: string;
    isVerified: boolean;
    isArchived: boolean;
    status: 'pending' | 'assessed';
    approvedBy: string;
    country: string;
    state: string;
}

interface VehicleChangePayload {
    vehicleModel: string;
    vehicleMake: string;
    inspection: Inspection;
    insurance: Insurance;
    licensePlate: string;
    image: Record<string, string>[];
    year: number;
    hasAC: boolean;
    driverId: string;
    isVerified: boolean;
    isArchived: boolean;
    status: 'pending' | 'assessed';
    approvedBy: string;
    country: string;
    state: string;
}

interface RejectVehicleChangePayload {
    vehicleId: string;
    userEmail: string;
}

interface ApproveVehicleChangePayload {
    vehicleId: string;
}

interface DeleteVehiclesPayload {
    vehicleIds: string[];
}

export const vehicleApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getVehicles: builder.query<Vehicle[], {
            vehicleId?: string;
            cursor?: string;
            sort?: string;
        }>({
            query: (params) => ({
                url: '/vehicles',
                method: 'GET',
                params,
            }),
            providesTags: ['vehicle'],
        }),

        changeVehicle: builder.mutation<void, VehicleChangePayload>({
            query: (args) => ({
                url: '/vehicles/change',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['vehicle'],
        }),

        rejectVehicleChange: builder.mutation<void, RejectVehicleChangePayload>({
            query: (args) => ({
                url: '/vehicles/reject_vehicle_change',
                method: 'POST',
                body: args,
            }),
            invalidatesTags: ['vehicle'],
        }),

        approveVehicleChange: builder.mutation<void, ApproveVehicleChangePayload>({
            query: (args) => ({
                url: '/vehicles/approve_vehicle_change',
                method: 'PATCH',
                body: args,
            }),
            invalidatesTags: ['vehicle'],
        }),

        deleteVehicles: builder.mutation<void, DeleteVehiclesPayload>({
            query: (args) => ({
                url: '/vehicles/delete_vehicles',
                method: 'PATCH',
                body: args,
            }),
            invalidatesTags: ['vehicle'],
        }),
    }),
});

export const {
    useGetVehiclesQuery,
    useChangeVehicleMutation,
    useRejectVehicleChangeMutation,
    useApproveVehicleChangeMutation,
    useDeleteVehiclesMutation,
} = vehicleApi;
