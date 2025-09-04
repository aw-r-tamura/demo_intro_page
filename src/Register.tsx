import { useState } from 'react'

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    postalCode: '',
    city: '',
    birthdate: '',
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
    <div className="container">
      <h2 className="center-align">新規登録</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <label htmlFor="username" className="active">
            ユーザー名
          </label>
        </div>
        <div className="input-field">
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email" className="active">
            メールアドレス
          </label>
        </div>
        <div className="row">
          <div className="input-field col s8">
            <input
              id="postalCode"
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
            />
            <label htmlFor="postalCode" className="active">
              郵便番号
            </label>
          </div>
          <div className="col s4" style={{ marginTop: '1rem' }}>
            <button type="button" className="btn" onClick={handleZipSearch}>
              住所検索
            </button>
          </div>
        </div>
        <div className="input-field">
          <input
            id="city"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <label htmlFor="city" className="active">
            市町村
          </label>
        </div>
        <div className="input-field">
          <input
            id="birthdate"
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            required
          />
          <label htmlFor="birthdate" className="active">
            生年月日
          </label>
        </div>
        <div className="input-field">
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label htmlFor="password" className="active">
            パスワード
          </label>
        </div>
        <div className="input-field">
          <input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <label htmlFor="confirmPassword" className="active">
            パスワード（確認）
          </label>
        </div>
        <button type="submit" className="btn">
          登録
        </button>
      </form>
    </div>
  )
}

export default Register
