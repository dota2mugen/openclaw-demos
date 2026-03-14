import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './App.css'

// 思维节点类型
const THINKING_STEPS = [
  { type: 'input', label: '理解问题', icon: '📥' },
  { type: 'analyze', label: '分析问题', icon: '🔍' },
  { type: 'search', label: '搜索知识', icon: '📚' },
  { type: 'reason', label: '逻辑推理', icon: '🧠' },
  { type: 'create', label: '生成方案', icon: '✨' },
  { type: 'review', label: '审查优化', icon: '✅' },
  { type: 'output', label: '输出结果', icon: '📤' },
]

// 示例问题
const EXAMPLE_QUESTIONS = [
  "如何设计一个用户登录系统？",
  "解释一下什么是微服务架构",
  "如何优化数据库查询性能？",
  "帮我设计一个电商网站的数据库",
]

function App() {
  const [question, setQuestion] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [currentStep, setCurrentStep] = useState(-1)
  const [thoughts, setThoughts] = useState([])
  const [result, setResult] = useState('')

  // 模拟 AI 思考过程
  const simulateThinking = async () => {
    if (!question.trim()) return
    
    setIsThinking(true)
    setCurrentStep(-1)
    setThoughts([])
    setResult('')

    // 逐步展示思考过程
    for (let i = 0; i < THINKING_STEPS.length; i++) {
      setCurrentStep(i)
      const step = THINKING_STEPS[i]
      
      // 为每个步骤生成思考内容
      const thought = generateThought(step.type, question)
      setThoughts(prev => [...prev, { ...step, thought }])
      
      // 模拟思考时间
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400))
    }

    // 生成最终结果
    const finalResult = generateResult(question)
    setResult(finalResult)
    setIsThinking(false)
  }

  // 根据步骤类型生成思考内容
  const generateThought = (type, question) => {
    const thoughts = {
      input: `收到问题："${question}"`,
      analyze: `分析问题类型：${question.includes('如何') ? '方法论' : question.includes('解释') ? '概念说明' : '实践指导'}`,
      search: '检索相关知识库：设计模式、最佳实践、常见案例...',
      reason: '建立逻辑链：需求分析 → 架构设计 → 实现细节 → 注意事项',
      create: '生成解决方案框架...',
      review: '审查完整性、安全性、可扩展性...',
      output: '准备输出结构化答案',
    }
    return thoughts[type] || '思考中...'
  }

  // 生成最终结果
  const generateResult = (question) => {
    if (question.includes('登录')) {
      return `## 用户登录系统设计方案

### 1. 核心流程
1. 用户输入账号密码
2. 前端验证格式
3. 后端验证凭证
4. 生成 JWT Token
5. 返回用户信息

### 2. 安全考虑
- 密码 bcrypt 加密
- HTTPS 传输
- Token 过期机制
- 防止暴力破解

### 3. 数据库设计
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_hash VARCHAR(255),
  created_at TIMESTAMP
)
\`\`\``
    }
    
    return `## 解决方案

基于问题分析，建议采用以下方案：

### 核心思路
1. 理解问题本质
2. 参考行业最佳实践
3. 考虑可扩展性
4. 注意安全性

### 实施步骤
- 第一步：需求分析
- 第二步：技术选型
- 第三步：原型开发
- 第四步：测试优化

### 推荐技术栈
- 前端：React + TypeScript
- 后端：Node.js + PostgreSQL
- 部署：Docker + Kubernetes`
  }

  return (
    <div className="app">
      {/* 头部 */}
      <header className="header">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="logo"
        >
          <span className="logo-icon">🌊</span>
          <div>
            <h1>AI 思维可视化</h1>
            <p className="subtitle">看到 AI 如何"思考"一个问题</p>
          </div>
        </motion.div>
      </header>

      {/* 输入区域 */}
      <section className="input-section">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="input-container"
        >
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="输入一个问题，看看 AI 是如何思考的..."
            disabled={isThinking}
            rows={3}
          />
          
          <div className="examples">
            <span>试试这些问题：</span>
            {EXAMPLE_QUESTIONS.map((q, i) => (
              <button 
                key={i} 
                onClick={() => setQuestion(q)}
                disabled={isThinking}
              >
                {q}
              </button>
            ))}
          </div>

          <motion.button
            className="think-button"
            onClick={simulateThinking}
            disabled={!question.trim() || isThinking}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isThinking ? '🔄 思考中...' : '🧠 开始思考'}
          </motion.button>
        </motion.div>
      </section>

      {/* 思维过程可视化 */}
      <AnimatePresence>
        {thoughts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="thinking-section"
          >
            <h2>🔮 思维过程</h2>
            <div className="thinking-flow">
              {THINKING_STEPS.map((step, index) => (
                <ThinkingNode
                  key={index}
                  step={step}
                  isActive={index === currentStep}
                  isCompleted={index < currentStep}
                  thought={thoughts[index]?.thought}
                />
              ))}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 结果展示 */}
      {result && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="result-section"
        >
          <h2>✨ 解决方案</h2>
          <div className="result-content">
            <pre>{result}</pre>
          </div>
        </motion.section>
      )}

      {/* 页脚 */}
      <footer className="footer">
        <p>Powered by <strong>Yuan</strong> (OpenClaw AI) | 
        演示项目：<a href="https://dota2mugen.github.io/openclaw-demos" target="_blank">dota2mugen.github.io/openclaw-demos</a></p>
      </footer>
    </div>
  )
}

// 思维节点组件
function ThinkingNode({ step, isActive, isCompleted, thought }) {
  return (
    <motion.div
      className={`thinking-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
    >
      <div className="node-header">
        <span className="node-icon">{step.icon}</span>
        <span className="node-label">{step.label}</span>
        {isCompleted && <span className="checkmark">✓</span>}
        {isActive && <span className="pulse">●</span>}
      </div>
      {thought && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="node-thought"
        >
          {thought}
        </motion.div>
      )}
    </motion.div>
  )
}

export default App
