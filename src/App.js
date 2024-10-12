import React, { useState } from "react";
import "./App.css";

const App = () => {
  const correctAnswers = {
    question1: ["27", "4", "8", "5", "0"],
    question2: ["+", "(", "+", "/", "(", "-", "0", "0", "0", "0", "0"],
    question3: ["23", "3", "3", "5", "0"],
    question4: ["top>=MaxSize", "top++"],
    question5: "8",
    question6: "2",
    question7: "abcd-e**+",
    question8: {
      inputs: ["F", "0", "0", "0", "D", "E"],
      front: "3",
      rear: "0",
    },
    question10: ["*", "(", "/", "(", "-", "*", "0", "0", "0", "0", "0"],
    question11: "22",
    question13: "ABC,ACB,BAC,BCA,CBA",
    question25: [3, 5],
    finalAnswer: "2,3",
  };

  const [userInputs, setUserInputs] = useState({
    question1: [],
    question2: [],
    question3: [],
    question4: [],
    question5: "",
    question6: "",
    question7: "",
    question8: { inputs: [], front: "", rear: "" },
    question10: [],
    question11: "",
    question13: [],
    question25: [],
    finalAnswer: [],
  });
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e, questionKey, index = null, subKey = null) => {
    const newInputs = { ...userInputs };

    if (questionKey === "question8") {
      // question8의 입력 처리
      if (subKey) {
        // front 또는 rear 변경 시
        newInputs[questionKey][subKey] = e.target.value;
      } else if (index !== null) {
        // inputs 배열의 특정 값 변경 시
        newInputs[questionKey].inputs[index] = e.target.value;
      }
    } else {
      // 그 외의 질문 처리
      if (index !== null) {
        newInputs[questionKey][index] = e.target.value;
      } else {
        newInputs[questionKey] = e.target.value;
      }
    }

    setUserInputs(newInputs);
  };

  const handleCheckboxChange = (e, index) => {
    const checked = e.target.checked;
    const selectedAnswers = [...userInputs.question25];
    if (checked) {
      selectedAnswers.push(index);
    } else {
      const answerIndex = selectedAnswers.indexOf(index);
      if (answerIndex > -1) {
        selectedAnswers.splice(answerIndex, 1);
      }
    }
    setUserInputs({ ...userInputs, question25: selectedAnswers });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const wrongAnswers = [];

    if (
      JSON.stringify(userInputs.question1) !==
      JSON.stringify(correctAnswers.question1)
    )
      wrongAnswers.push("문제 1");

    if (
      JSON.stringify(userInputs.question2) !==
      JSON.stringify(correctAnswers.question2)
    )
      wrongAnswers.push("문제 2");

    if (
      JSON.stringify(userInputs.question3) !==
      JSON.stringify(correctAnswers.question3)
    )
      wrongAnswers.push("문제 3");
    if (
      userInputs.question4[0] !== correctAnswers.question4[0] ||
      userInputs.question4[1] !== correctAnswers.question4[1]
    )
      wrongAnswers.push("문제 4");
    if (userInputs.question5 !== correctAnswers.question5)
      wrongAnswers.push("문제 5");
    if (userInputs.question6 !== correctAnswers.question6)
      wrongAnswers.push("문제 6");
    if (userInputs.question7 !== correctAnswers.question7)
      wrongAnswers.push("문제 7");

    if (
      JSON.stringify(userInputs.question8.inputs) !==
        JSON.stringify(correctAnswers.question8.inputs) ||
      userInputs.question8.front !== correctAnswers.question8.front ||
      userInputs.question8.rear !== correctAnswers.question8.rear
    )
      wrongAnswers.push("문제 8");

    if (
      JSON.stringify(userInputs.question10) !==
      JSON.stringify(correctAnswers.question10)
    )
      wrongAnswers.push("문제 10");

    if (userInputs.question11 !== correctAnswers.question11)
      wrongAnswers.push("문제 11");

    if (userInputs.question13 !== correctAnswers.question13)
      wrongAnswers.push("문제 13");
    if (
      JSON.stringify(userInputs.question25.sort()) !==
      JSON.stringify(correctAnswers.question25.sort())
    )
      wrongAnswers.push("문제 25");

    if (userInputs.finalAnswer !== correctAnswers.finalAnswer)
      wrongAnswers.push("마지막 문제 4번");

    setIncorrectAnswers(wrongAnswers);
    setIsModalOpen(true);
  };

  const handleClear = () => {
    setUserInputs({
      question1: [],
      question2: [],
      question3: [],
      question4: [],
      question5: "",
      question6: "",
      question7: "",
      question8: { inputs: [], front: "", rear: "" },
      question10: [],
      question11: "",
      question13: [],
      question25: [],
      finalAnswer: [],
    });
    setIncorrectAnswers([]);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>역대 기출문제 3장</h1>
      <h3 style={{ textAlign: "center" }}>답안이 공란인 경우 0으로 작성.</h3>
      <h3 style={{ textAlign: "center" }}>
        대소문자 구별 필수!! 띄어쓰기 있을 경우 오답처리됩니다.
      </h3>
      <h3 style={{ textAlign: "center" }}>9번과 12번은 개인카톡으로 주세요.</h3>
      <form onSubmit={handleSubmit} className="form-container">
        <h2>문제 1</h2>
        <table>
          <thead>
            <tr>
              {["0", "1", "2", "3", "4"].map((num, idx) => (
                <th key={idx}>{num}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Array.from({ length: 5 }, (_, i) => (
                <td key={i}>
                  <input
                    type="text"
                    value={userInputs.question1[i] || ""}
                    onChange={(e) => handleInputChange(e, "question1", i)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* 문제 2 */}
        <h2>문제 2</h2>
        <table>
          <thead>
            <tr>
              {["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"].map(
                (num, idx) => (
                  <th key={idx}>{num}</th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Array.from({ length: 11 }, (_, i) => (
                <td key={i}>
                  <input
                    type="text"
                    value={userInputs.question2[i] || ""}
                    onChange={(e) => handleInputChange(e, "question2", i)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>

        {/* 문제 3 */}
        <h2>문제 3</h2>
        <table>
          <thead>
            <tr>
              {["0", "1", "2", "3", "4"].map((num, idx) => (
                <th key={idx}>{num}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Array.from({ length: 5 }, (_, i) => (
                <td key={i}>
                  <input
                    type="text"
                    value={userInputs.question3[i] || ""}
                    onChange={(e) => handleInputChange(e, "question3", i)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <h2>문제 4</h2>
        <h4>MaxSize, top 형태로 대소문자 구분해서 작성</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <div style={{ flex: 1 }}>
            <label>A:</label>
            <input
              type="text"
              value={userInputs.question4[0] || ""}
              onChange={(e) => handleInputChange(e, "question4", 0)}
              style={{ width: "80%" }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>B:</label>
            <input
              type="text"
              value={userInputs.question4[1] || ""}
              onChange={(e) => handleInputChange(e, "question4", 1)}
              style={{ width: "80%" }}
            />
          </div>
        </div>

        <h2>문제 5</h2>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={userInputs.question5 || ""}
            onChange={(e) => handleInputChange(e, "question5")}
            style={{ width: "100%" }}
          />
        </div>

        <h2>문제 6</h2>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={userInputs.question6 || ""}
            onChange={(e) => handleInputChange(e, "question6")}
            style={{ width: "100%" }}
          />
        </div>

        <h2>문제 7</h2>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={userInputs.question7 || ""}
            onChange={(e) => handleInputChange(e, "question7")}
            style={{ width: "100%" }}
          />
        </div>

        <h2>문제 8</h2>
        <h4>대문자 또는 숫자만 작성</h4>
        <table>
          <thead>
            <tr>
              {["0", "1", "2", "3", "4", "5"].map((num, idx) => (
                <th key={idx}>{num}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Array.from({ length: 6 }, (_, i) => (
                <td key={i}>
                  <input
                    type="text"
                    value={userInputs.question8.inputs[i] || ""}
                    onChange={(e) => handleInputChange(e, "question8", i)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <div>
            <label>Front: </label>
            <input
              type="text"
              value={userInputs.question8.front || ""}
              onChange={(e) => handleInputChange(e, "question8", null, "front")}
              style={{ width: "100px" }}
            />
          </div>
          <div>
            <label>Rear: </label>
            <input
              type="text"
              value={userInputs.question8.rear || ""}
              onChange={(e) => handleInputChange(e, "question8", null, "rear")}
              style={{ width: "100px" }}
            />
          </div>
        </div>
        {/* 문제 10 */}
        <h2>문제 10</h2>
        <table>
          <thead>
            <tr>
              {Array.from({ length: 11 }, (_, i) => (
                <th key={i}>{i}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {Array.from({ length: 11 }, (_, i) => (
                <td key={i}>
                  <input
                    type="text"
                    value={userInputs.question10[i] || ""}
                    onChange={(e) => handleInputChange(e, "question10", i)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
        {/* 문제 11 */}
        <h2>문제 11</h2>
        <input
          type="text"
          value={userInputs.question11 || ""}
          onChange={(e) => handleInputChange(e, "question11")}
          style={{ width: "100%" }}
        />
        {/* 문제 13 */}
        <h2>문제 13 </h2>
        <h4>"대문자로만 작성, 알파벳순, 콤마구분 예시:ABC,ACB"</h4>
        <input
          type="text"
          placeholder="정답 입력 (콤마로 구분, 알파벳 순, 띄어쓰기, 소문자 금지)"
          value={userInputs.question13 || ""}
          onChange={(e) => handleInputChange(e, "question13")}
          style={{ width: "100%" }}
        />
        <h2>문제 25</h2>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {Array.from({ length: 5 }, (_, i) => (
            <label key={i} style={{ display: "flex", alignItems: "center" }}>
              <input
                type="checkbox"
                checked={userInputs.question25.includes(i + 1)}
                onChange={(e) => handleCheckboxChange(e, i + 1)}
                style={{ marginRight: "5px" }}
              />
              {["①", "②", "③", "④", "⑤"][i]}
            </label>
          ))}
        </div>

        <h2>마지막 문제 4번</h2>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="정답 입력 (콤마로 구분)"
            value={userInputs.finalAnswer || ""}
            onChange={(e) => handleInputChange(e, "finalAnswer")}
            style={{ width: "100%" }}
          />
        </div>

        <button type="submit" className="class-button">
          채점
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

      {/* 모달 창 */}
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
