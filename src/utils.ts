export const getDateWithHours= (hours = 0): Date=>{
    const now: Date = new Date();
    now.setHours(now.getHours()+hours);
    return now;
}