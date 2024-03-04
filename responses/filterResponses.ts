import { Request, Response } from "express";
import * as superagent from "superagent";

export async function filterResponses(req: Request, res: Response) {
  res.status(200);
  res.json({ responses: [] });
  console.log("filterResponses() called");
  return;

  try {
    // fetch the responses
    const { formId } = req.params;
    const apiResBody = await fetchResponses(formId);
    const { responses } = apiResBody;

    // apply the filters
    const filters = parseFilters(req.query.filters as string | string[]);
    const filtered = applyFilters(responses, filters);

    // respond with the filtered results
    const body = {
      ...apiResBody,
      responses: filtered,
      totalResponses: filtered.length,
    };
    res.status(200);
    res.json(body);
  } catch (err) {
    const message = `Error during filterResponses() call: ${err}`;
    console.error(message);
    res.status(500);
    res.json(message);
  }
}

type ResponseFilter = {
  id: string;
  condition: "equals" | "does_not_equal" | "greater_than" | "less_than";
  value: number | string;
};

interface Question {
  id: string;
  name: string;
  type: string;
  value: string | number;
}

interface FormResponse {
  questions: Question[];
}

async function fetchResponses(
  formId: string,
): Promise<{ responses: FormResponse[] }> {
  const key =
    "sk_prod_TfMbARhdgues5AuIosvvdAC9WsA5kXiZlW8HZPaRDlIbCpSpLsXBeZO7dCVZQwHAY3P4VSBPiiC33poZ1tdUj2ljOzdTCCOSpUZ_3912";
  const res = await superagent
    .get(`https://api.fillout.com/v1/api/forms/${formId}/submissions`)
    .set({
      Authorization: `Bearer ${key}`,
    });
  return res.body;
}

function parseFilters(filterStrings: string | string[]): ResponseFilter[] {
  const filters =
    typeof filterStrings === "string"
      ? [JSON.parse(filterStrings)]
      : filterStrings.map((raw: string) => JSON.parse(raw) as ResponseFilter);
  console.log("Filters:\n" + JSON.stringify(filters));
  return filters;
}

function applyFilters(responses: FormResponse[], filters: ResponseFilter[]) {
  return responses.filter((response: FormResponse) =>
    filters.every((filter) => {
      const question = response.questions.find(
        (question) => question.id === filter.id,
      );
      if (!question) return false;
      const { condition } = filter;
      if (condition === "equals" && question.value === filter.value)
        return true;
      if (condition === "does_not_equal" && question.value !== filter.value)
        return true;
      if (condition === "greater_than" && question.value > filter.value)
        return true;
      return condition === "less_than" && question.value < filter.value;
    }),
  );
}
