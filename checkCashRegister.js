function checkCashRegister(price, cash, cid) {
  const register = {
    "ONE HUNDRED": 100,
    TWENTY: 20,
    TEN: 10,
    FIVE: 5,
    ONE: 1,
    QUARTER: 0.25,
    DIME: 0.1,
    NICKEL: 0.05,
    PENNY: 0.01,
  };
  let owed = cash - price;
  const change = [];
  const cidReduce = Number(
    cid.reduce((acc, item) => (acc += item[1]), 0).toFixed(2)
  );

  if (cidReduce === owed) return { status: "CLOSED", change: cid };

  for (const domination in register) {
    const mathFloorORd = Math.floor(owed / register[domination]);
    if (mathFloorORd === 0) continue;
    const cidFI = cid.findIndex((arr) => arr[0] === domination);

    if (cid[cidFI][1] > 0) {
      if (mathFloorORd * register[domination] <= cid[cidFI][1]) {
        change.push([domination, mathFloorORd * register[domination]]);
        owed = Number((owed - mathFloorORd * register[domination]).toFixed(2));
        cid[cidFI][1] -= mathFloorORd * register[domination];
      } else {
        change.push([domination, cid[cidFI][1]]);
        owed = Number((owed - cid[cidFI][1]).toFixed(2));
        cid[cidFI][1] = 0;
      }
    }
  }

  return owed === 0
    ? { status: "OPEN", change: [...change] }
    : { status: "INSUFFICIENT_FUNDS", change: [] };
}

checkCashRegister(3.26, 100, [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
]);
