import { useState } from 'react'
import './Register.css'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    postalCode: '',
    city: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // For now just log the data.
    console.log('Registering user', formData)
  }

  const handleZipSearch = async () => {
    if (!formData.postalCode) return
    try {
      const res = await fetch(
        `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${formData.postalCode}`,
      )
      const data = await res.json()
      if (data.results?.length) {
        const r = data.results[0]
        setFormData((prev) => ({
          ...prev,
          city: `${r.address2}${r.address3}`,
        }))
      } else {
        alert('市町村が見つかりません')
      }
    } catch (err) {
      console.error('住所取得に失敗しました', err)
    }
  }

  return (
    <div className="register-container">
      <h2>新規登録</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <label>
          ユーザー名
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          メールアドレス
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          郵便番号
          <div className="zip-container">
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
            />
            <button type="button" onClick={handleZipSearch}>
              住所検索
            </button>
          </div>
        </label>
        <label>
          市町村
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          パスワード
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          パスワード（確認）
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">登録</button>
      </form>
    </div>
  )
}

export default Register
