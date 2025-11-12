import React, { useState } from "react";
import toast from 'react-hot-toast';
import { confirmationBiasGameAPI } from '../../services/api.js'; 
import { useAuth } from '../../contexts/AuthContext.jsx';
import Navbar from '../../components/Navbar.jsx';  
import styles from './ConfirmationBiasGame.module.css'; 

const ConfirmationBiasGame = () => {
  const { user } = useAuth();
  const [answers, setAnswers] = useState({
    stanceTech: '',
    stanceEcon: '',
    confirmBiasTech: '',
    confirmBiasEcon: '',
    evalBiasTechSupport: '',
    evalBiasTechOppose: '',
    evalBiasEconSupport: '',
    evalBiasEconOppose: ''
  });
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSecondSection, setShowSecondSection] = useState(false);


  const handleInputChange = (field, value) => {
    setAnswers(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?._id) {
      toast.error('用户信息错误，请重新登录');
      return;
    }

    // 检查是否所有问题都已回答
    const allAnswered = Object.values(answers).every(answer => answer !== '');
    if (!allAnswered) {
      toast.error('请回答所有问题');
      return;
    }

    setLoading(true);
    
    confirmationBiasGameAPI.submit({
      userId: user._id,
      ...answers
    })
    .then((response) => {
      if (response.status === 201) {
        toast.success('提交成功！感谢您的参与。');
        setHasSubmitted(true);
      }
    })
    .catch((error) => {
      const { response } = error;
      if (response?.status === 409) {
        toast.error('你已经提交过游戏答案，无法重复提交。');
        setHasSubmitted(true);
      } else {
        console.error('提交失败:', error);
        toast.error(`${response?.data?.message || '提交失败，请重试'}`);
      }
    })
    .finally(() => {
      setLoading(false);
    });
  };

  // 检查第一部分是否已回答
  const isFirstSectionComplete = answers.stanceTech && answers.stanceEcon;
 
 
  // #region 定义话题的内容
  const textContent = {
    techTopicContent: "基因编辑技术是一种能够精准修改基因的科学手段，它就像一把“基因剪刀”，可以对生物的基因进行精确的修改。基因编辑技术可以精准修复生殖细胞中的致病基因，从而预防某些遗传病的发生。通过去除有害基因，可以提高后代的整体健康水平。同时，基因编辑技术也可能被用于“定制婴儿”，违背自然生育的伦理原则，引发社会不平等。此外，它对人类基因库的长期影响尚不明确。",
    econTopicContent: "自由市场通常指由供求关系主导资源配置，政府少干预，企业自主经营、竞争充分。有政府干预的市场通常指市场起基础作用，政府通过政策、法规等调控，弥补市场失灵。自由市场强调市场机制的主导作用，有利于高效配置资源，激发创新动力。但它可能导致贫富差距扩大——资源往往向少数有能力获取和利用市场机会的人集中。有政府干预的市场可以通过政策手段来调节收入分配，促进社会公平。但在政策执行过程中可能会出现效率不高，甚至有人利用政策漏洞谋取私利等情况。",
    techTopicSupportOpinion: "对基因编辑这项技术持反对意见，其本质上是在反对“医学进步”。人类几千年来一直在用各种方式优化后代——从选择配偶到接种疫苗，从营养改善到产前筛查。基因编辑不过是更精确的“优生学”，就像我们用抗生素对抗细菌一样自然。我们不应该因为担心一些可能的伦理风险，而漠视众多孩子天生携带致命遗传病基因。",
    techTopicOpposeOpinion: "有相关的观点认为基因编辑技术能预防疾病，可预防疾病是在人为干预生命的自然轨迹。生命自诞生起就该遵循自然赋予的模样，任何干预都会破坏生命最本真的状态。人类进化，历经百万年的自然筛选才走到今天，现在的每一个人都是自然进化的结果，基因编辑试图通过修改基因来预防疾病，就是否定了自然进化的成果。",
    econTopicSupportOpinion: "众多宣扬自由市场的优越性的声音中，其所指的自由市场本质是让资本肆意扩张、是企业为所欲为的借口。政府干预才能更好保障员工的自由。如果没有政府强制企业保障员工权益，员工更加难以保障自己的相关权益；不通过行政命令管控物价，消费者不会有平价购物的自由。那些反对政府干预的人，无视了企业偷税漏税、破坏环境等非法行为。",
    econTopicOpposeOpinion: "自由市场自发形成的秩序，才是最合理的社会规则。企业追求利润最大化，本质上是通过提供优质产品和服务满足社会需求，在盈利的同时创造就业、推动创新，其实是在为社会创造财富。商家根据供需调整价格，是对市场信号最直接的响应，也是保障资源合理分配的必然选择。所以，自由市场的运作是高效的，不需要多余的外部干预。"
  }
  // #endregion



  // 如果已经提交过，显示完成页面
  if (hasSubmitted) {
    return (
      <div>
        <Navbar />
        <div>
          <h2>✅ 游戏已完成</h2>
          <p>你已经成功提交游戏答案，感谢你的参与！</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      {/* <h1>游戏简介</h1> */}
      <form onSubmit={handleSubmit}>
        {/* 立场问题 */}
        <div className={styles.reportStanceSection}>
          <div className={styles.phase1Intro}>
            <h3>第一部分</h3>
            <p>请依次阅读下面两个话题，并表明你的观点立场。</p>
          </div>
          <div className={styles.gridContainer}>
            <div className={styles.singleTopic}>
              <strong>阅读材料：</strong>{textContent.techTopicContent}
            </div>
            <div className={styles.singleTopic}>
              <strong>阅读材料：</strong>{textContent.econTopicContent}
            </div>
            <div className={styles.formSection}>
               <p>请问，你是否支持将基因编辑技术应用于人类生殖细胞？</p>
                <label>
                  <input
                    type="radio"
                    name="stanceTech"
                    value="support"
                    checked={answers.stanceTech === 'support'}
                    onChange={() => handleInputChange('stanceTech', 'support')}
                    disabled={showSecondSection}
                  />
                  支持
                </label>
                <label>
                  <input
                    type="radio"
                    name="stanceTech"
                    value="oppose"
                    checked={answers.stanceTech === 'oppose'}
                    onChange={() => handleInputChange('stanceTech', 'oppose')}
                    disabled={showSecondSection}
                  />
                  反对
                </label>
            </div>
            <div className={styles.formSection}>
              <p>请问，你是否支持有政府干预的市场？</p>
              <label>
                <input
                  type="radio"
                  name="stanceEcon"
                  value="support"
                  checked={answers.stanceEcon === 'support'}
                  onChange={() => handleInputChange('stanceEcon', 'support')}
                  disabled={showSecondSection}
                />
                支持
              </label>
              <label>
                <input
                  type="radio"
                  name="stanceEcon"
                  value="oppose"
                  checked={answers.stanceEcon === 'oppose'}
                  onChange={() => handleInputChange('stanceEcon', 'oppose')}
                  disabled={showSecondSection}
                />
                反对
              </label>
            </div>
          </div>
          <p><strong>请认真对待，并如实回答每一个问题。</strong></p>
          <button 
            className={styles.submitButton}
            type="button"
            onClick={() => setShowSecondSection(true)}
            disabled={!isFirstSectionComplete}
            >
              确认并继续
          </button>
        </div>
        {/* 第二部分：条件渲染 */}
        {showSecondSection && (
          <div className={styles.biasesElicitationSection}>
            <div className={styles.phase2Intro}>
              <h3>第二部分</h3>
              <ul>
                <li>第二部分的阅读材料内容和第一部分一样。</li>
                <li>对于每一个话题，我们向你提供了两个观点。请仔细阅读这两个观点，并回答后面的问题。</li>
                <li>第一个问题要求你从以上两个观点中选择一个继续阅读。（由于时间限制，我们无法提供具体的阅读内容；但你需要从中选择一个，表面你希望进一步了解其观点的具体内容。</li>
                <li>第二个问题要求你对每个观点的<strong>内容质量</strong>进行评分，评分范围从1星（非常差）到5星（非常好）。请考虑内容的可靠性、相关性和说服力。</li>
              </ul>
            </div>
            <div className={styles.gridContainer}>
              <div className={styles.singleTopic}>
                <strong>阅读材料：</strong>{textContent.techTopicContent}
                <hr className={styles.customDivider} />
                <p>请阅读下面两个观点，并回答后面的问题。</p>
                <p><strong>观点1：</strong>{textContent.techTopicSupportOpinion}</p>
                <p><strong>观点2：</strong>{textContent.techTopicOpposeOpinion}</p>
              </div>
              <div className={styles.singleTopic}>
                <strong>阅读材料：</strong>{textContent.econTopicContent}
                <hr className={styles.customDivider} />
                <p>请阅读下面两个观点，并回答后面的问题。</p>
                <p><strong>观点1：</strong>{textContent.econTopicSupportOpinion}</p>
                <p><strong>观点2：</strong>{textContent.econTopicOpposeOpinion}</p>
              </div>
              <div className={styles.formSection}>
                  <div className="confirmBiasElicitation">
                    请选择一个观点继续阅读：
                    <label>
                      <input
                        type="radio"
                        name="confirmBiasTech"
                        value="support"
                        checked={answers.confirmBiasTech === 'support'}
                        onChange={() => handleInputChange('confirmBiasTech', 'support')}
                      />
                      观点1
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="confirmBiasTech"
                        value="oppose"
                        checked={answers.confirmBiasTech === 'oppose'}
                        onChange={() => handleInputChange('confirmBiasTech', 'oppose')}
                      />
                      观点2
                    </label>
                  </div>

                  <div className={styles.evalBiasGridContainer}>
                    <div>
                      请给<strong>观点1</strong>打分：
                      <select
                        value={answers.evalBiasTechSupport}
                        onChange={(e) => handleInputChange('evalBiasTechSupport', e.target.value)}
                        style={{ width: '40px' }}
                      >
                        <option value="">---</option>
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num.toString()}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>
                  
                    <div>
                      请给<strong>观点2</strong>打分：
                      <select
                        value={answers.evalBiasTechOppose}
                        onChange={(e) => handleInputChange('evalBiasTechOppose', e.target.value)}
                        style={{ width: '40px' }}
                      >
                        <option value="">---</option>
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num.toString()}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
              </div>
              <div className={styles.formSection}>
                  <div className="confirmBiasElicitation">
                    请选择一个观点继续阅读：
                    <label>
                      <input
                        type="radio"
                        name="confirmBiasEcon"
                        value="support"
                        checked={answers.confirmBiasEcon === 'support'}
                        onChange={() => handleInputChange('confirmBiasEcon', 'support')}
                      />
                      观点1
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="confirmBiasEcon"
                        value="oppose"
                        checked={answers.confirmBiasEcon === 'oppose'}
                        onChange={() => handleInputChange('confirmBiasEcon', 'oppose')}
                      />
                      观点2
                    </label>
                  </div>
                  
                  <div className={styles.evalBiasGridContainer}>
                    <div>
                      请给<strong>观点1</strong>打分：
                      <select
                        value={answers.evalBiasEconSupport}
                        onChange={(e) => handleInputChange('evalBiasEconSupport', e.target.value)}
                        style={{ width: '40px' }}
                      >
                        <option value="">---</option>
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num.toString()}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      请给<strong>观点2</strong>打分：
                      <select
                        value={answers.evalBiasEconOppose}
                        onChange={(e) => handleInputChange('evalBiasEconOppose', e.target.value)}
                        style={{ width: '40px' }}
                      >
                        <option value="">---</option>
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num.toString()}>
                            {num}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
              </div>
            </div>
            {/* 提交按钮 */}
            <div>
              <p><strong>请认真对待，并如实回答每一个问题。</strong></p>
              <button 
                className={styles.submitButton}
                type="submit"
                disabled={loading}
              >
                {loading ? '提交中...' : '提交答案'}
              </button>
            </div>
         </div>
        )}
      </form>
    </div>
  );
}

export default ConfirmationBiasGame;