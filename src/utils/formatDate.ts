/**
 * Formatea una fecha en formato legible (DD de Mes, AAAA)
 * @param date La fecha a formatear
 * @returns Fecha formateada en formato español
 */
export function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };

    return new Date(date).toLocaleDateString('es-ES', options);
}