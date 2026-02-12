import Swal from 'sweetalert2';
import type { SweetAlertIcon } from 'sweetalert2';

/**
 * Custom hook or utility for system-wide toast notifications.
 * Configured to appear as a small bar on the top-right.
 */
export const showSystemNotification = (type: 'success' | 'error' | 'warning', message: string) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    const iconMap: Record<string, SweetAlertIcon> = {
        success: 'success',
        error: 'error',
        warning: 'warning'
    };

    Toast.fire({
        icon: iconMap[type],
        title: message
    });
};

const SystemNotification = () => null; // This component doesn't need to render anything
export default SystemNotification;
