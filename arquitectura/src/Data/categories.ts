export interface Category {
    id: string;
    name: string;
    slug: string;
    image: string;
}

export const categories: Category[] = [
    {
        id: "c1",
        name: "Plantas de Interior",
        slug: "interior",
        image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "c2",
        name: "Bajo Mantenimiento",
        slug: "bajo-mantenimiento",
        image: "https://images.unsplash.com/photo-1509423355108-74d69bb6ca55?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "c3",
        name: "Pet Friendly",
        slug: "pet-friendly",
        image: "https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: "c4",
        name: "Plantas Colgantes",
        slug: "colgantes",
        image: "https://images.unsplash.com/photo-1591958911259-b1088d8b9f0c?auto=format&fit=crop&q=80&w=800"
    }
];
