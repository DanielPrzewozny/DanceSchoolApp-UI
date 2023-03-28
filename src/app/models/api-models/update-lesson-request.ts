export interface UpdateLessonRequest {
  id: number,
  danceGroup: string,
  name: string,
  teacherId: number,
  timeEst: string,
  description: string,
  everySpecificDayOfWeek: string,
}
