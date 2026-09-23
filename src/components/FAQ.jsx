import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: "Домбыра клубына кімдер қатыса алады?",
    answer: "Клубқа мектептің 7–12 сынып аралығындағы барлық оқушылары қатыса алады. Бастапқы деңгейіңізге қарамай, барлық ниет білдірушілерді қуана қабылдаймыз."
  },
  {
    question: "Өз домбырам болуы міндетті ме?",
    answer: "Жоқ, міндетті емес. Мектеп базасында дайындықтарға арналған оқу домбыралары бар және олар оқушыларға тегін беріледі. Өз аспабыңыз болса, әрине, онымен келуге болады."
  },
  {
    question: "Бұрын домбыра ойнап көрмеген оқушы нөлден үйрене ала ма?",
    answer: "Иә, әрине! Бізде екі бағыт жұмыс істейді: «Кіші топ» — жаңадан бастаушыларға арналған. Мұнда нота сауаты, қағыс түрлері және негізгі күйлер жеңіл әдіспен үйретіледі. Ал тәжірибелі домбырашылар бірден «Үлкен топқа» (сахналық ансамбльге) қабылданады."
  },
  {
    question: "Дайындықтар қай күндері және қайда өтеді?",
    answer: "Дайындықтар аптасына 2–3 рет мектептің акт залында және музыка кабинетінде сабақтан кейінгі уақытта өткізіледі. Нақты кесте тоқсан сайын оқушылардың бос уақытына сай бекітіледі."
  },
  {
    question: "Клубқа қалай жазылуға болады?",
    answer: "Сайттағы «WhatsApp тобы» сілтемесіне өту немесе «Тіркелу» батырмасы арқылы онлайн өтінім қалдыру жеткілікті. Клуб жетекшісі сізді тиісті топ чатына қосады."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="section section-alt faq-section" id="faq">
      <div className="container">
        <div className="sec-header">
          <div className="eyebrow">
            <HelpCircle size={14} />
            <span>Жиі қойылатын сұрақтар • Вопросы и ответы</span>
          </div>
          <h2 className="sec-title">
            Клуб туралы <em>сұрақ-жауап</em>
          </h2>
          <p className="sec-sub">
            Қатысу шарттары, сабақ кестесі және үйірмеге жазылу бойынша ең маңызды ақпарат.
          </p>
        </div>

        <div className="faq-accordion-list">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className={`faq-item card-white ${isOpen ? 'open' : ''}`}>
                <button
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <ChevronDown className={`faq-icon ${isOpen ? 'rotated' : ''}`} size={18} />
                </button>
                <div className="faq-answer-wrapper">
                  <div className="faq-answer-inner">
                    <p className="faq-answer-text">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
