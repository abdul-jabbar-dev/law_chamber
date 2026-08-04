"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import AppointmentModal from "@/src/components/common/AppointmentModal";

interface AppointmentContextType {
    openAppointmentModal: () => void;
    closeAppointmentModal: () => void;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export function AppointmentProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const openAppointmentModal = () => setIsOpen(true);
    const closeAppointmentModal = () => setIsOpen(false);

    return (
        <AppointmentContext.Provider value={{ openAppointmentModal, closeAppointmentModal }}>
            {children}
            <AppointmentModal isOpen={isOpen} onClose={closeAppointmentModal} />
        </AppointmentContext.Provider>
    );
}

export function useAppointmentModal() {
    const context = useContext(AppointmentContext);
    if (!context) {
        // Fallback for SSR or un-wrapped components
        return {
            openAppointmentModal: () => {},
            closeAppointmentModal: () => {},
        };
    }
    return context;
}
