import { Project, ServiceItem, ProjectDetails } from '../types';

// Supabase Types (Hypothetical DB Schema based on local types)
export interface SupabaseProject {
    id: string;
    name: string;
    description: string;
    client: string;
    status: string;
    date: string;
    owner_id?: string; // Relation to auth user
}

export interface SupabaseService {
    id: string;
    code: string;
    source: string;
    name: string;
    unit: string;
    area: number; // mapped to quantity if needed, strictly keeping 'area' as per request
    environment: string;
    existing_floor: string;
    new_floor: string;
    brand: string;
    model: string;
    material_price: number;
    labor_price: number;
    category: string;
    memorial_def?: any;
    project_id?: string;
}

export const dataMapper = {
    toSupabaseProject: (project: Project): SupabaseProject => ({
        id: project.id,
        name: project.name,
        description: project.description,
        client: project.client,
        status: project.status,
        date: project.date,
    }),

    fromSupabaseProject: (dbProject: SupabaseProject): Project => ({
        id: dbProject.id,
        name: dbProject.name,
        description: dbProject.description || '',
        client: dbProject.client || '',
        status: dbProject.status as any,
        date: dbProject.date,
    }),

    toSupabaseService: (service: ServiceItem, projectId?: string): SupabaseService => ({
        id: service.id,
        code: service.code,
        source: service.source,
        name: service.name,
        unit: service.unit,
        area: service.area,
        environment: service.environment,
        existing_floor: service.existingFloor,
        new_floor: service.newFloor,
        brand: service.brand,
        model: service.model,
        material_price: service.materialPrice,
        labor_price: service.laborPrice,
        category: service.category || 'Outros',
        memorial_def: service.memorialDef,
        project_id: projectId
    }),

    fromSupabaseService: (dbService: SupabaseService): ServiceItem => ({
        id: dbService.id,
        code: dbService.code,
        source: dbService.source,
        name: dbService.name,
        unit: dbService.unit,
        area: dbService.area,
        environment: dbService.environment,
        existingFloor: dbService.existing_floor,
        newFloor: dbService.new_floor,
        brand: dbService.brand,
        model: dbService.model,
        materialPrice: dbService.material_price,
        laborPrice: dbService.labor_price,
        category: dbService.category || 'Outros',
        memorialDef: dbService.memorial_def,
    })
};
