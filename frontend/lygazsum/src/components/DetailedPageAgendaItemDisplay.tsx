import { AgendaItemAnalysis, SpeakerDetail } from "@/types/analysisTypes";
import { slugify } from "@/utils/slugify";
import { JSX } from "react";
import numberToChineseNumber from "@/utils/numberToChineseNumber";

interface AgendaItemAnalysisDisplayProps {
  item: AgendaItemAnalysis;
  itemIndex: number;
}

/**
 * 負責渲染單一議程項目的所有分析內容。
 * @param {AgendaItemAnalysisDisplayProps} props - 包含議程項目數據和索引的 props。
 */
export default function AgendaItemAnalysisDisplay({
  item,
  itemIndex,
}: AgendaItemAnalysisDisplayProps) {
  const {
    item_title,
    core_issue,
    controversy,
    legislator_speakers,
    respondent_speakers,
    result_status_next,
  } = item;

  // 為此議程項目下的所有元素創建唯一的 ID 前綴，用於錨點連結，同 tocUtils。
  const idPrefix = `item-${itemIndex}`;

  // 用於一般 h2 標題樣式
  const subtitleClasses =
    "text-neutral-900 text-lg md:text-xl font-semibold mb-2 md:mb-4 mt-10";

  // 用於內文樣式
  const textClasses =
    "text-neutral-800 text-base leading-[180%] md:leading-relaxed mb-2";

  /**
   * 輔助函式，用於渲染發言者列表及其觀點。
   * @param {SpeakerDetail[] | null} speakers - 發言者數據陣列。
   * @returns {JSX.Element | JSX.Element[]}
   */
  function renderSpeakerDetails(
    speakers: SpeakerDetail[] | null
  ): JSX.Element | JSX.Element[] {
    if (!speakers || speakers.length === 0)
      return <p className={textClasses}>無相關發言紀錄</p>;
    return speakers.map((speaker, index) => {
      const { speaker_name, speaker_viewpoint } = speaker;
      return (
        <li key={`${index}-${speaker_name}`}>
          <section
            // 使用 slugify 轉換姓名，生成唯一的、可用於 TOC 點擊定位的 ID。
            id={`${idPrefix}-speaker-${slugify(speaker_name!)}`}
            className="scroll-mt-22 md:scroll-mt-24"
          >
            <h3 className="text-base font-semibold mt-4 md:mt-6 mb-2">
              {speaker_name}
            </h3>
            <ul className="list-disc list-outside pl-8 mb-2">
              {speaker_viewpoint?.map((viewpoint) => (
                <li key={viewpoint} className={textClasses}>
                  {viewpoint}
                </li>
              ))}
            </ul>
          </section>
        </li>
      );
    });
  }

  return (
    <>
      {/* 議題摘要 */}
      <section
        id={`${idPrefix}-item-title`}
        className="scroll-mt-22 md:scroll-mt-24"
      >
        <h2 className={subtitleClasses}>
          討論事項{numberToChineseNumber(itemIndex + 1)}
        </h2>
        <p className="text-base text-neutral-800 leading-[180%] md:leading-relaxed mb-4">
          {item_title}
        </p>
      </section>

      {/* 核心議題 */}
      <section
        id={`${idPrefix}-core-issues`}
        className="scroll-mt-22 md:scroll-mt-24"
      >
        <h2 className={subtitleClasses}>核心議題</h2>
        {core_issue && core_issue.length > 1 && (
          <ul className="list-disc list-outside pl-8 space-y-2">
            {core_issue.map((issue) => (
              <li key={issue} className={textClasses}>
                {issue}
              </li>
            ))}
          </ul>
        )}

        {core_issue && core_issue.length === 1 && (
          <p className={textClasses}>{core_issue[0]}</p>
        )}

        {(!core_issue || core_issue.length === 0) && (
          <p className={textClasses}>無相關核心議題</p>
        )}
      </section>

      {/* 相關爭議 */}
      <section
        id={`${idPrefix}-controversies`}
        className="scroll-mt-22 md:scroll-mt-24"
      >
        <h2 className={subtitleClasses}>相關爭議</h2>
        {controversy && controversy.length > 1 && (
          <ul className="list-disc list-outside pl-8">
            {controversy.map((controversy) => (
              <li key={controversy} className={textClasses}>
                {controversy}
              </li>
            ))}
          </ul>
        )}

        {controversy && controversy.length === 1 && (
          <p className={textClasses}>{controversy[0]}</p>
        )}

        {(!controversy || controversy.length === 0) && (
          <p className={textClasses}>無相關爭議</p>
        )}
      </section>

      {/* 立法委員發言 */}
      {/* `data-toc-observer-target` 用於 TOC 自動展開功能 */}
      <section data-toc-observer-target={`${idPrefix}-legislators-speech`}>
        <h2
          className={`${subtitleClasses} scroll-mt-22 md:scroll-mt-24`}
          id={`${idPrefix}-legislators-speech`}
        >
          立法委員發言
        </h2>
        <ul>{renderSpeakerDetails(legislator_speakers)}</ul>
      </section>

      {/* 相關人員發言 */}
      <section data-toc-observer-target={`${idPrefix}-respondents-response`}>
        <h2
          className={`${subtitleClasses} scroll-mt-22 md:scroll-mt-24`}
          id={`${idPrefix}-respondents-response`}
        >
          相關人員發言
        </h2>
        <ul>{renderSpeakerDetails(respondent_speakers)}</ul>
      </section>

      {/* 相關後續 */}
      <section
        className="scroll-mt-22 md:scroll-mt-24"
        id={`${idPrefix}-result-next`}
      >
        <h2 className={subtitleClasses}>相關後續</h2>
        {result_status_next && result_status_next.length > 1 && (
          <ul className="list-disc list-outside pl-8">
            {result_status_next?.map((result_status_next) => (
              <li key={result_status_next} className={textClasses}>
                {result_status_next}
              </li>
            ))}
          </ul>
        )}

        {result_status_next && result_status_next.length === 1 && (
          <p className={textClasses}>{result_status_next[0]}</p>
        )}

        {(!result_status_next || result_status_next.length === 0) && (
          <p className={textClasses}>無相關後續</p>
        )}
      </section>
    </>
  );
}
