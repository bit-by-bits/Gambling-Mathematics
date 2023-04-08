import axios from "axios"
import React, { useContext, useEffect, useRef, useState } from "react"
import GlobalContext from "../globalContext"
import "../Styles/question.css"
import { useNavigate } from "react-router-dom"
import baseURL from "../baseURL"

const Question = () => {
  const Ref = useRef(null)
  const navigate = useNavigate()

  const { user, setUser } = useContext(GlobalContext)
  const [timer, setTimer] = useState("00:00:00")

  const [ques, setQues] = useState({
    question: "",
    options: [],
    qid: null,
  })

  useEffect(() => {
    console.log(ques)
  }, [ques])

  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const getTimeRemaining = e => {
    const total = Date.parse(e) - Date.parse(new Date())

    const seconds = Math.floor((total / 1000) % 60)
    const minutes = Math.floor((total / 1000 / 60) % 60)
    const hours = Math.floor((total / 1000 / 60 / 60) % 24)

    return {
      total,
      hours,
      minutes,
      seconds,
    }
  }

  const startTimer = (t, e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e)

    if (total <= 0) {
      axios({
        method: "post",
        url: `${baseURL.BASE}/answer`,
        headers: {
          Authorization: `Bearer ${
            user.token ?? JSON.parse(localStorage.user).token
          }`,
        },
        data: {
          question_id: t,
        },
      })

      clearInterval(Ref.current)
      cancel()
    } else {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      )
    }
  }

  const clearTimer = (t, e) => {
    setTimer("00:03:00")
    if (Ref.current) clearInterval(Ref.current)
    const id = setInterval(() => startTimer(t, e), 1000)
    Ref.current = id
  }

  const getDeadTime = () => {
    let deadline = new Date()
    deadline.setSeconds(deadline.getSeconds() + 180)
    return deadline
  }

  const cancel = () => {
    setError(true)
    clearInterval(Ref.current)

    setTimeout(() => {
      navigate("/categories")
    }, 600)
  }

  useEffect(() => {
    document.title = "Gambling Maths | Answer Your Question"

    axios({
      method: "get",
      url: `${baseURL.BASE}/get_question`,
      headers: {
        Authorization: `Bearer ${
          user.token ?? JSON.parse(localStorage.user).token
        }`,
      },
    })
      .then(res => {
        setUser({ ...user, points: res.data.points })
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, points: res.data.points })
        )

        setQues({
          question: res.data.question,
          options: res.data.options,
          qid: res.data.question_id,
        })

        clearTimer(res.data.question_id, getDeadTime())
      })
      .catch(err => {
        setError(true)
      })
  }, [])

  return (
    <div className="question-wrapper">
      <div id="question-head">
        GAMBLING MATHS
        <div className="stash">
          <div className="stashTitle">Betting Stash</div>
          <div className="stashAmount">
            {user.points ?? JSON.parse(localStorage.user).points ?? "N/A"}
          </div>
        </div>
      </div>

      <div id="left">
        <div className="reg-par" id="question">
          {ques?.question ? (
            <img src={ques.question} alt={ques.question} className="ques-img" />
          ) : (
            "Fetching Question.."
          )}
        </div>

        <div id="answers">
          {ques?.options?.map(opt => {
            return (
              <div
                key={opt.option_id}
                id={opt.option_id}
                className="answer glass"
                onClick={() => {
                  axios({
                    method: "post",
                    url: `${baseURL.BASE}/answer`,
                    headers: {
                      Authorization: `Bearer ${
                        user.token ?? JSON.parse(localStorage.user).token
                      }`,
                    },
                    data: {
                      question_id: ques.qid,
                      option_id: opt.option_id,
                    },
                  })
                    .then(res => {
                      setUser({
                        ...user,
                        category: null,
                        points: res.data.points,
                      })

                      localStorage.setItem(
                        "user",
                        JSON.stringify({
                          ...user,
                          category: null,
                          points: res.data.points,
                        })
                      )

                      if (res.data.status === "correct") setSuccess(true)
                      else if (res.data.status === "incorrect") setError(true)
                      clearInterval(Ref.current)

                      setTimeout(() => {
                        navigate("/categories")
                      }, 600)
                    })
                    .catch(err => cancel())
                }}
              >
                {opt.option_text}
              </div>
            )
          }) ?? "Fetching Options.."}
        </div>
      </div>

      <div id="right">
        <div id="right-grid">
          <div className="reg-par">Answer before the timer runs out</div>
          <div className="num" id="timer">
            {timer}
          </div>
        </div>
      </div>

      <div
        id="err-cont"
        style={error ? { display: "flex" } : { display: "none" }}
      >
        <div id="err" className="glass">
          <div id="err-head">FAILURE</div>
          <div className="reg-par">
            You could not pick the correct answer. Redirecting you back to
            categories.
          </div>
          <div
            onClick={() => {
              navigate("/categories")
              setError(false)
            }}
            className="btns"
          >
            Continue
          </div>
        </div>
      </div>

      <div
        id="succ-cont"
        style={success ? { display: "flex" } : { display: "none" }}
      >
        <div id="succ" className="glass">
          <div id="succ-head">SUCCESS</div>
          <div className="reg-par">
            You picked the correct answer. Redirecting you back to categories.
          </div>
          <div
            onClick={() => {
              navigate("/categories")
              setSuccess(false)
            }}
            className="btns"
          >
            Continue
          </div>
        </div>
      </div>
    </div>
  )
}

export default Question
