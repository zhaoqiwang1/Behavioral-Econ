const request = require('../../../utils/request.js');
const auth = require('../../../utils/auth.js');

Page({
  data: {
    // 文本内容（与网页端一致）
    textContent: {
      techTopicContent: "基因编辑技术是一种能够精准修改基因的科学手段，它就像一把'基因剪刀'，可以对生物的基因进行精确的修改。基因编辑技术可以精准修复生殖细胞中的致病基因，从而预防某些遗传病的发生。通过去除有害基因，可以提高后代的整体健康水平。同时，基因编辑技术也可能被用于'定制婴儿'，违背自然生育的伦理原则，引发社会不平等。此外，它对人类基因库的长期影响尚不明确。",
      econTopicContent: "自由市场通常指由供求关系主导资源配置，政府少干预，企业自主经营、竞争充分。有政府干预的市场通常指市场起基础作用，政府通过政策、法规等调控，弥补市场失灵。自由市场强调市场机制的主导作用，有利于高效配置资源，激发创新动力。但它可能导致贫富差距扩大——资源往往向少数有能力获取和利用市场机会的人集中。有政府干预的市场可以通过政策手段来调节收入分配，促进社会公平。但在政策执行过程中可能会出现效率不高，甚至有人利用政策漏洞谋取私利等情况。",
      techTopicSupportOpinion: "对基因编辑这项技术持反对意见，其本质上是在反对'医学进步'。人类几千年来一直在用各种方式优化后代——从选择配偶到接种疫苗，从营养改善到产前筛查。基因编辑不过是更精确的'优生学'，就像我们用抗生素对抗细菌一样自然。我们不应该因为担心一些可能的伦理风险，而漠视众多孩子天生携带致命遗传病基因。",
      techTopicOpposeOpinion: "有相关的观点认为基因编辑技术能预防疾病，可预防疾病是在人为干预生命的自然轨迹。生命自诞生起就该遵循自然赋予的模样，任何干预都会破坏生命最本真的状态。人类进化，历经百万年的自然筛选才走到今天，现在的每一个人都是自然进化的结果，基因编辑试图通过修改基因来预防疾病，就是否定了自然进化的成果。",
      econTopicSupportOpinion: "众多宣扬自由市场的优越性的声音中，其所指的自由市场本质是让资本肆意扩张、是企业为所欲为的借口。政府干预才能更好保障员工的自由。如果没有政府强制企业保障员工权益，员工更加难以保障自己的相关权益；不通过行政命令管控物价，消费者不会有平价购物的自由。那些反对政府干预的人，无视了企业偷税漏税、破坏环境等非法行为。",
      econTopicOpposeOpinion: "自由市场自发形成的秩序，才是最合理的社会规则。企业追求利润最大化，本质上是通过提供优质产品和服务满足社会需求，在盈利的同时创造就业、推动创新，其实是在为社会创造财富。商家根据供需调整价格，是对市场信号最直接的响应，也是保障资源合理分配的必然选择。所以，自由市场的运作是高效的，不需要多余的外部干预。"
    },

    // 答案对象
    answers: {
      stanceTech: '',
      stanceEcon: '',
      confirmBiasTech: '',
      confirmBiasEcon: '',
      evalBiasTechSupport: '',
      evalBiasTechOppose: '',
      evalBiasEconSupport: '',
      evalBiasEconOppose: ''
    },

    ratingOptions: ['请选择', '1', '2', '3', '4', '5'],
    showSecondSection: false,
    loading: false,
    hasSubmitted: false,
    userId: '',
    firstSectionComplete: false,
    allAnswered: false
  },

  onLoad() {
    auth.updateLastActivity();

    const userInfo = wx.getStorageSync('userInfo');
    if (!userInfo || !userInfo._id) {
      wx.showToast({ title: '请先登录', icon: 'none' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }
    this.setData({ userId: userInfo._id });
  },

  onShow() {
    auth.updateLastActivity();
  },

  // ----- 更新完成状态 -----
  updateCompletionStatus() {
    const a = this.data.answers;
    const firstSectionComplete = !!(a.stanceTech && a.stanceEcon);
    const allAnswered = !!(a.stanceTech && a.stanceEcon &&
                           a.confirmBiasTech && a.confirmBiasEcon &&
                           a.evalBiasTechSupport && a.evalBiasTechOppose &&
                           a.evalBiasEconSupport && a.evalBiasEconOppose);
    this.setData({
      firstSectionComplete,
      allAnswered
    });
  },

  // ----- 第一部分：立场选择 -----
  onStanceTechChange(e) {
    this.setData({
      'answers.stanceTech': e.detail.value
    }, () => this.updateCompletionStatus());
  },

  onStanceEconChange(e) {
    this.setData({
      'answers.stanceEcon': e.detail.value
    }, () => this.updateCompletionStatus());
  },

  // 进入第二部分
  goToPhase2() {
    if (!this.data.firstSectionComplete) {
      wx.showToast({ title: '请先完成第一部分的立场选择', icon: 'none' });
      return;
    }
    this.setData({ showSecondSection: true });
  },

  // ----- 第二部分：确认偏差 -----
  onConfirmBiasTechChange(e) {
    this.setData({
      'answers.confirmBiasTech': e.detail.value
    }, () => this.updateCompletionStatus());
  },

  onConfirmBiasEconChange(e) {
    this.setData({
      'answers.confirmBiasEcon': e.detail.value
    }, () => this.updateCompletionStatus());
  },

  onEvalTechSupportChange(e) {
    const idx = e.detail.value;
    const val = idx === 0 ? '' : this.data.ratingOptions[idx];
    this.setData({
      'answers.evalBiasTechSupport': val
    }, () => this.updateCompletionStatus());
  },

  onEvalTechOpposeChange(e) {
    const idx = e.detail.value;
    const val = idx === 0 ? '' : this.data.ratingOptions[idx];
    this.setData({
      'answers.evalBiasTechOppose': val
    }, () => this.updateCompletionStatus());
  },

  onEvalEconSupportChange(e) {
    const idx = e.detail.value;
    const val = idx === 0 ? '' : this.data.ratingOptions[idx];
    this.setData({
      'answers.evalBiasEconSupport': val
    }, () => this.updateCompletionStatus());
  },

  onEvalEconOpposeChange(e) {
    const idx = e.detail.value;
    const val = idx === 0 ? '' : this.data.ratingOptions[idx];
    this.setData({
      'answers.evalBiasEconOppose': val
    }, () => this.updateCompletionStatus());
  },

  // ----- 提交 -----
  onSubmit(e) {
    // 小程序中不需要 preventDefault，直接处理
    const { userId, answers, loading, hasSubmitted } = this.data;
    if (loading || hasSubmitted) return;

    if (!this.data.allAnswered) {
      wx.showToast({ title: '请回答所有问题', icon: 'none' });
      return;
    }

    this.setData({ loading: true });

    request({
      url: '/confirmationbiasgame/submit',
      method: 'POST',
      data: {
        userId: userId,
        stanceTech: answers.stanceTech,
        stanceEcon: answers.stanceEcon,
        confirmBiasTech: answers.confirmBiasTech,
        confirmBiasEcon: answers.confirmBiasEcon,
        evalBiasTechSupport: parseInt(answers.evalBiasTechSupport),
        evalBiasTechOppose: parseInt(answers.evalBiasTechOppose),
        evalBiasEconSupport: parseInt(answers.evalBiasEconSupport),
        evalBiasEconOppose: parseInt(answers.evalBiasEconOppose)
      }
    })
      .then(res => {
        wx.showToast({ title: '提交成功！', icon: 'success' });
        this.setData({ hasSubmitted: true });
      })
      .catch(err => {
        console.error('提交错误:', err);
        if (err.statusCode === 409 && err.data?.alreadySubmitted) {
          wx.showToast({ title: '你已经提交过，不能重复提交', icon: 'none' });
          this.setData({ hasSubmitted: true });
          return;
        }
        const msg = err.data?.message || '提交失败，请重试';
        wx.showToast({ title: msg, icon: 'none' });
      })
      .finally(() => {
        this.setData({ loading: false });
      });
  }
});