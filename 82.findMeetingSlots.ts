export type Interval = [number, number];

// Sort & faltten array - O(n*mlogn*m) time; O(n*m) space;
export function findMeetingSlots(schedules: Interval[][]) {
  const busyIntervals = schedules.flat(); // O(n*m) time; O(n*m) space
  busyIntervals.sort((intervalA, intervalB) => {
    const [start1, end1] = intervalA;
    const [start2, end2] = intervalB;
    if (start1 - start2 < 0) return -1;
    if (start1 - start2 > 0) return 1;
    return end1 - end2 < 0 ? -1 : 1;
  }); // O(n*mlogn*m)
  // [[8, 9],[10, 13],[11, 12],[13, 15],[13, 18]]

  let latestAvailableHour = 0;
  const result: Interval[] = [];
  busyIntervals.forEach((interval) => {
    const [busyStart, busyEnd] = interval;
    if (latestAvailableHour < busyStart) {
      result.push([latestAvailableHour, busyStart]);
    }
    latestAvailableHour = Math.max(latestAvailableHour, busyEnd);
  }); // O(n*m) time;

  if (latestAvailableHour !== 24) {
    result.push([latestAvailableHour, 24]);
  }

  return result;
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
