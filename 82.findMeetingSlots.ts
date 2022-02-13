export type Interval = [number, number];

// Sort & faltten array - O((n*m)logn) time; O(n*m) space;
export function findMeetingSlots(schedules: Interval[][]) {
  const busyIntervals = schedules.flat();
  busyIntervals.sort((a, b) => {
    // Compare start hour, if same, compare end hour
    if (a[0] - b[0] < 0) {
      return -1;
    } else if (a[0] - b[0] > 0) {
      return 1;
    } else {
      if (a[1] - b[1] < 0) {
        return -1;
      } else {
        return 1;
      }
    }
  }); // O((n*m)logn)
  // [[8, 9],[10, 13],[11, 12],[13, 15],[13, 18]]

  const availableSlots = [];
  let lastBusyEndHour = 0;
  for (let i = 0; i < busyIntervals.length; i++) {
    const [busyStart, busyEnd] = busyIntervals[i];
    if (lastBusyEndHour < busyStart) {
      availableSlots.push([lastBusyEndHour, busyStart]);
    }
    lastBusyEndHour = Math.max(lastBusyEndHour, busyEnd);
  } // O(n*m) time;

  if (lastBusyEndHour !== 24) {
    availableSlots.push([lastBusyEndHour, 24]);
  }
  return availableSlots;
}

// Example
const meetingSlots = findMeetingSlots([
  [
    [13, 15],
    [11, 12],
    [10, 13],
  ],
  [[8, 9]],
  [[13, 18]],
]);
console.log(meetingSlots); // [[0,8],[9,10],[18,24]]
