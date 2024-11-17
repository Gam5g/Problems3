import React, { useState, useEffect } from "react";
import "./App.css";

const WAIT_TIME_SECONDS = 40;
const WAIT_TIME_MS = WAIT_TIME_SECONDS * 1000;

const App = () => {
  const correctAnswers = {
    question1: "ACBDEHFGI",
    question2: "14",
    question3: [
      [
        "!first&&!second",
        "first==NULL&&second==NULL",
        "!first&&second==NULL",
        "first==NULL&&!second",
        "!second&&!first",
        "second==NULL&&first==NULL",
        "second==NULL&&!first",
        "!second&&first==NULL",
      ],
      "equal(first->left_child,second->left_child)",
      "equal(first->right_child,second->right_child)",
    ],
    question4: "2^(k-1)<=n<=2^k-1",
    question5: "ABCDEFGH",
    question6: "BFEJHD",
    question7: "8",
    question10: [
      "swap(original->rchild)",
      "swap(original->lchild)",
      "original->data",
    ],
    question11: "k,2^k-1",
    question13: [
      ["ptr==NULL", "!ptr", "(ptr)==NULL"],
      "1+count(ptr->lchild)+count(ptr->rchild)",
    ],
    question15: ["k,2^k-1", "1,2^(i-1)"],
    question16: ["0", "5", "3", "4", "2", "1", "0", "0"],
    question17: ["returnptr", "returnFindMax(ptr->rchild)"],
    question18: [["2^h-1-h", "2^h-h-1"], "-1"],
    question19: ["tree_depth(ptr->lchild)", "tree_depth(ptr->rchild)"],
    question20: "ADECBHG",
    question21: ["1023", "2"],
    question22: "BCEFDA",
    question23: "25",
    question24: ["3", "4"],
    question25: [
      [
        "(ptr->lchild)!=NULL&&(ptr->rchild)!=NULL",
        "(ptr->lchild)&&(ptr->rchild)",
        "(ptr->lchild)&&(ptr->rchild)!=NULL",
        "(ptr->lchild)!=NULL&&(ptr->rchild)",
        "ptr->lchild!=NULL&&ptr->rchild!=NULL",
        "ptr->lchild&&ptr->rchild",
        "ptr->lchild&&ptr->rchild!=NULL",
        "ptr->lchild!=NULL&&ptr->rchild",
        "ptr->lchild!=NULL&&(ptr->rchild)!=NULL",
        "ptr->lchild&&(ptr->rchild)",
        "ptr->lchild&&(ptr->rchild)!=NULL",
        "ptr->lchild!=NULL&&(ptr->rchild)",
        "(ptr->lchild)!=NULL&&ptr->rchild!=NULL",
        "(ptr->lchild)&&ptr->rchild",
        "(ptr->lchild)&&ptr->rchild!=NULL",
        "(ptr->lchild)!=NULL&&ptr->rchild",
      ],
      "1+count_node2(ptr->lchild)+count_node2(ptr->rchild)",
    ],
    question29: [
      'printf("%d",root->data)',
      'printf("%d",root->data)ancestor(root->rchild,data)',
      'printf("%d",root->data)ancestor(root->lchild,data)',
    ],
    question32: [
      ["ptr->lchild==NULL", "!ptr->lchild", "(ptr->lchild)==NULL"],
      ["ptr->rchild==NULL", "!ptr->rchild", "(ptr->rchild)==NULL"],
    ],
  };

  const [userInputs, setUserInputs] = useState({
    question1: "",
    question2: "",
    question3: ["", "", ""],
    question4: "",
    question5: "",
    question6: "",
    question7: "",
    question10: ["", "", ""],
    question11: "",
    question13: ["", ""],
    question15: ["", ""],
    question16: Array(8).fill(""),
    question17: ["", ""],
    question18: ["", ""],
    question19: ["", ""],
    question20: "",
    question21: ["", ""],
    question22: "",
    question23: "",
    question24: ["", ""],
    question25: ["", ""],
    question26: "",
    question29: ["", "", ""],
    question32: ["", ""],
  });

  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [countdown, setCountdown] = useState(WAIT_TIME_SECONDS);

  useEffect(() => {
    const storedSubmitTime = localStorage.getItem("submitTime");
    if (storedSubmitTime) {
      const currentTime = new Date().getTime();
      const timePassed = currentTime - parseInt(storedSubmitTime, 10);

      if (timePassed < WAIT_TIME_MS) {
        const remainingTime = WAIT_TIME_SECONDS - Math.floor(timePassed / 1000);
        setCountdown(remainingTime);
        setIsSubmitDisabled(true);

        const interval = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              setIsSubmitDisabled(false);
              localStorage.removeItem("submitTime");
              return WAIT_TIME_SECONDS;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        localStorage.removeItem("submitTime");
      }
    }
  }, []);

  const checkAnswer = (userAnswer, correctAnswer) => {
    if (Array.isArray(correctAnswer)) {
      return correctAnswer.some((possibleAnswer) =>
        Array.isArray(possibleAnswer)
          ? JSON.stringify(possibleAnswer) === JSON.stringify(userAnswer)
          : possibleAnswer === userAnswer
      );
    }
    return userAnswer === correctAnswer;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const wrongAnswers = [];

    const questions = [
      { key: "question1", label: "문제 1" },
      { key: "question2", label: "문제 2" },
      { key: "question3", label: "문제 3", isArray: true },
      { key: "question4", label: "문제 4" },
      { key: "question5", label: "문제 5" },
      { key: "question6", label: "문제 6" },
      { key: "question7", label: "문제 7" },
      { key: "question10", label: "문제 10", isArray: true },
      { key: "question11", label: "문제 11" },
      { key: "question13", label: "문제 13", isArray: true },
      { key: "question15", label: "문제 15", isObject: true },
      { key: "question16", label: "문제 16", isArray: true },
      { key: "question17", label: "문제 17", isArray: true },
      { key: "question18", label: "문제 18", isArray: true },
      { key: "question19", label: "문제 19", isArray: true },
      { key: "question20", label: "문제 20" },
      { key: "question21", label: "문제 21", isArray: true },
      { key: "question22", label: "문제 22" },
      { key: "question23", label: "문제 23" },
      { key: "question24", label: "문제 24", isArray: true },
      { key: "question25", label: "문제 25", isArray: true },
      { key: "question29", label: "문제 29", isArray: true },
      { key: "question32", label: "문제 32", isArray: true },
    ];

    questions.forEach(({ key, label, isArray, isObject }) => {
      const userAnswer = userInputs[key];
      const correctAnswer = correctAnswers[key];

      if (isObject) {
        const isCorrect =
          checkAnswer(userAnswer.min, correctAnswer.min) &&
          checkAnswer(userAnswer.max, correctAnswer.max);
        if (!isCorrect) wrongAnswers.push(label);
      } else if (isArray) {
        const isCorrect = userAnswer.every((answer, i) =>
          checkAnswer(answer, correctAnswer[i])
        );
        if (!isCorrect) wrongAnswers.push(label);
      } else if (!checkAnswer(userAnswer, correctAnswer)) {
        wrongAnswers.push(label);
      }
    });

    setIncorrectAnswers(wrongAnswers);
    setIsModalOpen(true);
  };

  const handleClear = () => {
    setUserInputs({
      question1: "",
      question2: "",
      question3: ["", "", ""],
      question4: "",
      question5: "",
      question6: "",
      question7: "",
      question10: ["", "", ""],
      question11: "",
      question13: ["", ""],
      question15: { min: ["", ""], max: ["", ""] },
      question16: Array(8).fill(""),
      question17: ["", ""],
      question18: ["", ""],
      question19: ["", ""],
      question20: "",
      question21: ["", ""],
      question22: "",
      question23: "",
      question24: ["", ""],
      question25: ["", ""],
      question29: ["", "", ""],
      question32: ["", ""],
    });
    setIncorrectAnswers([]);
  };

  const handleInputChange = (e, questionKey, index = null, subKey = null) => {
    setUserInputs((prevInputs) => {
      const newInputs = { ...prevInputs };
      if (subKey) {
        newInputs[questionKey][subKey][index] = e.target.value;
      } else if (index !== null) {
        newInputs[questionKey][index] = e.target.value;
      } else {
        newInputs[questionKey] = e.target.value;
      }
      return newInputs;
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSubmitDisabled(true);
    const submitTime = new Date().getTime();
    localStorage.setItem("submitTime", submitTime);
    setCountdown(WAIT_TIME_SECONDS);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSubmitDisabled(false);
          localStorage.removeItem("submitTime");
          return WAIT_TIME_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>역대 기출문제 5장</h1>
      <h4>아래의 파란색 문구를 잘 읽기 바랍니다.</h4>
      <h4>무분별한 채점 사용을 막기 위해 채점 버튼은 40초간 비활성화됩니다.</h4>
      <h4>
        코드문제 8번, 9번, 12번, 마지막 3번은 개인카톡으로 주면 채점합니다.
      </h4>
      <h4>추가 문의는 개인카톡으로 주세요.</h4>
      <h4 style={{ color: "blue" }}>
        대소문자 잘 보면서 기입하세요. 띄어쓰기 있을 경우 오답처리됩니다.
      </h4>
      <h4 style={{ color: "blue" }}>
        제곱의 경우 ^ 기호(shift+6)으로 사용, "null"이 아니라 "NULL"입니다.
      </h4>
      <h4 style={{ color: "blue" }}>답안이 공란인 경우 0으로 작성합니다.</h4>
      <form onSubmit={handleSubmit} className="form-container">
        <h2>문제 1</h2>
        <h4>ABCDEFGHIJK와 같이 대문자, 띄어쓰기 없이 기입</h4>
        <input
          type="text"
          value={userInputs.question1}
          onChange={(e) => handleInputChange(e, "question1")}
        />

        <h2>문제 2</h2>
        <input
          type="text"
          value={userInputs.question2}
          onChange={(e) => handleInputChange(e, "question2")}
        />

        <h2>문제 3</h2>
        {["가", "나", "다"].map((label, i) => (
          <div key={i}>
            <label>{label}: </label>
            <input
              type="text"
              placeholder="띄어쓰기 금지, 괄호 없이 기입"
              value={userInputs.question3[i]}
              onChange={(e) => handleInputChange(e, "question3", i)}
            />
          </div>
        ))}

        <h2>문제 4</h2>
        <h4>다음의 식 구성으로 만들 것 : a^(b-c)＜=n＜=d^e-f</h4>
        <input
          type="text"
          value={userInputs.question4}
          placeholder="다음의 식 구성으로 만들 것 : a^(b-c)<=n<=d^e-f"
          onChange={(e) => handleInputChange(e, "question4")}
        />

        <h2>문제 5</h2>
        <h4>ABCDEFGHIJK와 같이 대문자, 띄어쓰기 없이 기입</h4>
        <input
          type="text"
          value={userInputs.question5}
          onChange={(e) => handleInputChange(e, "question5")}
        />

        <h2>문제 6</h2>
        <h4>ABCDEFGHIJK와 같이 대문자, 띄어쓰기 없이 기입</h4>
        <input
          type="text"
          value={userInputs.question6}
          onChange={(e) => handleInputChange(e, "question6")}
        />

        <h2>문제 7</h2>
        <input
          type="text"
          value={userInputs.question7}
          onChange={(e) => handleInputChange(e, "question7")}
        />

        <h2>문제 10</h2>
        {["가", "나", "다"].map((label, i) => (
          <div key={i}>
            <label>{label}: </label>
            <input
              type="text"
              value={userInputs.question10[i]}
              placeholder="띄어쓰기 금지"
              onChange={(e) => handleInputChange(e, "question10", i)}
            />
          </div>
        ))}

        <h2>문제 11</h2>
        <h4>루트노드의 깊이는 1로 합니다.</h4>
        <input
          type="text"
          value={userInputs.question11}
          placeholder="콤마(쉼표로 구분), 띄어쓰기 금지"
          onChange={(e) => handleInputChange(e, "question11")}
        />

        <h2>문제 13</h2>
        {["가", "나"].map((label, i) => (
          <div key={i}>
            <label>{label}: </label>
            <input
              type="text"
              value={userInputs.question13[i]}
              onChange={(e) => handleInputChange(e, "question13", i)}
            />
          </div>
        ))}

        <h2>문제 15</h2>
        <h4>루트노드의 깊이는 1로 합니다.</h4>
        {["가", "나"].map((label, i) => (
          <div key={i}>
            <label>{label}: </label>
            <input
              type="text"
              value={userInputs.question15[i]}
              placeholder="최솟값,최댓값 형태로 작성, ^기호 사용"
              onChange={(e) => handleInputChange(e, "question15", i)}
            />
          </div>
        ))}

        <h2>문제 16</h2>
        <table>
          <thead>
            <tr>
              {[...Array(8).keys()].map((num) => (
                <th key={num}>{num}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Array.from({ length: 8 }, (_, i) => (
                <td key={i}>
                  <input
                    type="text"
                    value={userInputs.question16[i]}
                    onChange={(e) => handleInputChange(e, "question16", i)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        <h2>문제 17</h2>
        <h4>대소문자 구분, 띄어쓰기 금지</h4>
        {["가", "나"].map((label, i) => (
          <div key={i}>
            <label>{label}: </label>
            <input
              type="text"
              value={userInputs.question17[i]}
              placeholder="띄어쓰기 금지"
              onChange={(e) => handleInputChange(e, "question17", i)}
            />
          </div>
        ))}

        <h2>문제 18</h2>
        {["①", "②"].map((label, i) => (
          <div key={i}>
            <label>{label}: </label>
            <input
              type="text"
              value={userInputs.question18[i]}
              onChange={(e) => handleInputChange(e, "question18", i)}
            />
          </div>
        ))}

        <h2>문제 19</h2>
        {["가", "나"].map((label, i) => (
          <div key={i}>
            <label>{label}: </label>
            <input
              type="text"
              placeholder="띄어쓰기 금지"
              value={userInputs.question19[i]}
              onChange={(e) => handleInputChange(e, "question19", i)}
            />
          </div>
        ))}

        <h2>문제 20</h2>
        <h4>ABCDEFGHIJK와 같이 대문자, 띄어쓰기 없이 기입</h4>
        <input
          type="text"
          value={userInputs.question20}
          onChange={(e) => handleInputChange(e, "question20")}
        />

        <h2>문제 21</h2>
        {["①", "②"].map((label, i) => (
          <div key={i}>
            <label>{label}: </label>
            <input
              type="text"
              value={userInputs.question21[i]}
              placeholder="숫자만 작성"
              onChange={(e) => handleInputChange(e, "question21", i)}
            />
          </div>
        ))}

        <h2>문제 22</h2>
        <h4>ABCDEFGHIJK와 같이 대문자, 띄어쓰기 없이 기입</h4>
        <input
          type="text"
          value={userInputs.question22}
          onChange={(e) => handleInputChange(e, "question22")}
        />

        <h2>문제 23</h2>
        <input
          type="text"
          value={userInputs.question23}
          placeholder="숫자만 작성"
          onChange={(e) => handleInputChange(e, "question23")}
        />

        <h2>문제 24</h2>
        {["①", "②"].map((label, i) => (
          <div key={i}>
            <label>{label}: </label>
            <input
              type="text"
              value={userInputs.question24[i]}
              onChange={(e) => handleInputChange(e, "question24", i)}
            />
          </div>
        ))}

        <h2>문제 25</h2>
        <h4>(나)의 경우 정수를 맨 앞에 적어주세요.</h4>
        {["가", "나"].map((label, i) => (
          <div key={i}>
            <label>{label}: </label>
            <input
              type="text"
              value={userInputs.question25[i]}
              placeholder="띄어쓰기 금지"
              onChange={(e) => handleInputChange(e, "question25", i)}
            />
          </div>
        ))}

        <h2>문제 29</h2>
        <h4>세미쿨론 없이 코드 붙여서 사용하세요</h4>
        <h4>예시 : while(true)printf("helloworld")</h4>
        {["가", "나", "다"].map((label, i) => (
          <div key={i}>
            <label>{label}: </label>
            <input
              type="text"
              value={userInputs.question29[i]}
              placeholder="띄어쓰기 금지"
              onChange={(e) => handleInputChange(e, "question29", i)}
            />
          </div>
        ))}

        <h2>문제 32</h2>
        {["가", "나"].map((label, i) => (
          <div key={i}>
            <label>{label}: </label>
            <input
              type="text"
              value={userInputs.question32[i]}
              placeholder="띄어쓰기 금지"
              onChange={(e) => handleInputChange(e, "question32", i)}
            />
          </div>
        ))}

        <button
          type="submit"
          className="class-button"
          disabled={isSubmitDisabled}
        >
          {isSubmitDisabled ? `제출 불가(${countdown}초 남음)` : "채점"}
        </button>
        <button
          type="button"
          className="class-button"
          onClick={handleClear}
          style={{ marginLeft: "10px" }}
        >
          Clear
        </button>
      </form>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>틀린 문제들</h2>
            {incorrectAnswers.length > 0 ? (
              <ul>
                {incorrectAnswers.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>없습니다!</p>
            )}
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
