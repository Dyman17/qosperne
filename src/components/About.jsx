import React from 'react';
import { ArrowRight, Music, Users, Calendar, Award } from 'lucide-react';

export default function About({ onOpenRegister }) {
  return (
    <section className="section section-alt about-section" id="about">
      <div className="container">
        
        <div className="sec-header">
          <span className="eyebrow">Біз туралы • О клубе</span>
          <h2 className="sec-title">
            Ұлттық мұра мен <em>заманауи мектеп рухы</em>
          </h2>
          <p className="sec-sub">
            «Qos Perne» — Назарбаев Зияткерлік мектебіндегі домбыра өнерін қадірлейтін 
            оқушылардың басын қосқан ресми үйірме және ансамбль.
          </p>
        </div>

        <div className="about-grid-2col">
          {/* Left Column: Descriptive Content */}
          <div className="about-text-col card-white">
            <h3 className="about-col-title">Клубтың мақсаты мен бағыты</h3>
            <p className="about-paragraph">
              Біздің басты мақсатымыз — оқушылардың бойына ұлттық құндылықтарды сіңіру, 
              домбыраның қос ішегі арқылы қазақтың бай күйшілік дәстүрін ұғындыру және 
              мектеп қабырғасында ұйымшыл өнер қауымдастығын қалыптастыру.
            </p>
            <p className="about-paragraph">
              Клубта оқушы тек күй үйреніп қана қоймай, ансамбль құрамында үндестікті сезінуді, 
              сахна мәдениетін және көпшілік алдында өзін еркін ұстауды меңгереді. 
              Үйірмеге қатысу барлық NIS оқушылары үшін тегін.
            </p>

            <div className="about-action-row">
              <button onClick={onOpenRegister} className="btn btn-primary">
                <span>Клубқа қосылу</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Column: 4 Feature Cards */}
          <div className="about-cards-col">
            <div className="about-feature-card card-white">
              <div className="feature-icon-box">
                <Music size={22} color="#67a600" />
              </div>
              <div className="feature-content">
                <h4 className="feature-title">Үлкен топ (Сахналық құрам)</h4>
                <p className="feature-desc">
                  Күрделі төкпе және шертпе күйлерді меңгерген, мектеп салтанаттары мен 
                  қалалық, халықаралық іс-шараларда өнер көрсететін негізгі ансамбль.
                </p>
              </div>
            </div>

            <div className="about-feature-card card-white">
              <div className="feature-icon-box">
                <Users size={22} color="#67a600" />
              </div>
              <div className="feature-content">
                <h4 className="feature-title">Кіші топ (Нөлден бастаушылар)</h4>
                <p className="feature-desc">
                  Бұрын домбыра ұстап көрмеген оқушыларға арналған. Қағыс қағысы, 
                  нота сауаты және қарапайым халық әуендері түсінікті түрде үйретіледі.
                </p>
              </div>
            </div>

            <div className="about-feature-card card-white">
              <div className="feature-icon-box">
                <Award size={22} color="#67a600" />
              </div>
              <div className="feature-content">
                <h4 className="feature-title">Домбыраны мектеп береді</h4>
                <p className="feature-desc">
                  Жеке аспабы жоқ оқушыларға дайындық кезінде мектеп қорынан 
                  сапалы домбыралар толықтай тегін пайдалануға ұсынылады.
                </p>
              </div>
            </div>

            <div className="about-feature-card card-white">
              <div className="feature-icon-box">
                <Calendar size={22} color="#67a600" />
              </div>
              <div className="feature-content">
                <h4 className="feature-title">Дайындық кестесі</h4>
                <p className="feature-desc">
                  Аптасына 2–3 рет сабақтан тыс уақытта мектеп акт залы мен 
                  музыка кабинетінде өтеді. Кесте оқу үдерісіне ыңғайластырылған.
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
