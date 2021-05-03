export const CalendarEvent = ({ event }: any) => {
  const { title, user } = event;

  return (
    <div>
      <strong> { title } </strong>
      <span>- { user.name } </span>
    </div>
  )
}
