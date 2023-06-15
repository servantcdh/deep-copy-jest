const copyByJSON = (target) => JSON.parse(JSON.stringify(target));

const copyByBookSample = (target) => {
  var result = {};
  if (typeof target === "object" && target !== null) {
    for (var prop in target) {
      result[prop] = copyByBookSample(target[prop]);
    }
  } else {
    result = target;
  }
  return result;
};

const copyByStructuredClone = (target) => structuredClone(target);

const copyByMyFn = (target) => {
  // 반환할 값을 담을 객체 선언
  let result = {};

  // 데이터타입 검사 (null은 객체로 판단되므로 추가 작성)
  if (target === null || typeof target !== "object") {
    // 원시타입이므로 바로 복사 실행
    result = target;
  } else {
    // 참조타입

    // 컬렉션 여부 검사 (Set, Map, WeakSet, WeakMap)
    // 컬렉션 여부 플래그 선언
    let isCollection = false;

    if (target instanceof Set) {
      isCollection = true;
      result = new Set(target);
    }

    if (target instanceof Map) {
      isCollection = true;
      result = new Map(target);
    }

    // https://stackoverflow.com/questions/74610392/how-do-i-clone-a-weakmap-or-weakset-in-javascript/74694918?r=SearchResults&s=5%7C19.3111#74694918
    if (target instanceof WeakSet || target instanceof WeakMap) {
      isCollection = true;
      result = null;
    }

    // 넌-컬렉션
    if (!isCollection) {
      // Array 여부 검사
      if (Array.isArray(target)) {
        result = target.map((item) => copyByMyFn(item));
      } else {
        for (const prop in target) {
          // 자체 속성만 반복
          if (target.hasOwnProperty(prop)) {
            result[prop] = copyByMyFn(target[prop]);
          }
        }
      }
    }
  }

  return result;
};

module.exports = {
  copyByJSON,
  copyByBookSample,
  copyByStructuredClone,
  copyByMyFn,
};
