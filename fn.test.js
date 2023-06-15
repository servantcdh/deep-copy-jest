const fn = require("./fn");

let user = undefined;
let userMap = undefined;

// 매 테스트 전 실행
beforeEach(() => {
  user = {
    name: "최동호",
    age: 34,
    job: "웹개발자",
    isMale: true,
    hobbies: ["볼링", "영화감상", "자전거", "카페가기"],
    skillSet: new Set(["html", "css", "javascript"]),
  };
  userMap = new Map([["최동호", user]]);
});

for (const f in fn) {
  if (fn.hasOwnProperty(f)) {
    describe(`${f} 테스트 진행`, () => {
      const deepCopy = fn[f];

      let clonedUser = undefined;
      let clonedMap = undefined;

      test("에러없이 정상적으로 완료하나?", () => {
        clonedUser = deepCopy(user);
        clonedMap = deepCopy(userMap);
      });

      test("user가 깊은 복사가 되었나?", () => {
        expect(clonedUser).toStrictEqual(user);
      });

      test("userMap이 깊은 복사가 되었나?", () => {
        expect(clonedMap).toStrictEqual(userMap);
      });
    });
  }
}
