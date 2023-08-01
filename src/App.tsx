import { currencyApi } from "./services/apis"

function App() {
  async function test() {
    try {
      await currencyApi.get('/latest?amount=1&from=USD&to=BRL')

    } catch (error) {
      console.dir(error)
    }
  }

  return (
    <div>
      <button onClick={test}>
        click
      </button>
    <h3>here</h3>
    </div>
  )
}

export default App
