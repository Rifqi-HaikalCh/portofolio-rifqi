import { Experience } from "../types";

export const calculateTotalExperience = (experiences: Experience[]): { years: number; months: number } => {
  if (!experiences || experiences.length === 0) return { years: 0, months: 0 };

  const now = new Date();
  let earliestDate: Date | null = null;

  experiences.forEach((exp) => {
    const startStr = exp.period.split(/[–-]/)[0].trim();
    const startDate = parseDate(startStr);
    
    if (startDate && (!earliestDate || startDate < earliestDate)) {
      earliestDate = startDate;
    }
  });

  if (!earliestDate) return { years: 0, months: 0 };

  const diffInMonths =
    (now.getFullYear() - earliestDate.getFullYear()) * 12 +
    (now.getMonth() - earliestDate.getMonth());

  return {
    years: Math.floor(diffInMonths / 12),
    months: diffInMonths % 12
  };
};

const parseDate = (dateStr: string): Date | null => {
  const parts = dateStr.split(" ");
  if (parts.length !== 2) return null;

  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  
  const monthStr = parts[0].substring(0, 3).charAt(0).toUpperCase() + parts[0].substring(1, 3).toLowerCase();
  const month = monthNames.indexOf(monthStr);
  const year = parseInt(parts[1]);

  if (month === -1 || isNaN(year)) return null;
  return new Date(year, month);
};
