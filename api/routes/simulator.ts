import { Router, type Request, type Response } from 'express';
import {
  analyzeLoveDna,
  generateSoulmate,
  generateStoryEvent,
  generateEnding,
  generateReplay,
} from '../services/llm.js';

const router = Router();

function ok<T>(res: Response, data: T) {
  res.json({ success: true, data });
}

function fail(res: Response, message: string, status = 500) {
  res.status(status).json({ success: false, error: message });
}

router.post('/dna/analyze', async (req: Request, res: Response) => {
  try {
    const result = await analyzeLoveDna(req.body);
    ok(res, result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Love DNA 分析失败';
    fail(res, message);
  }
});

router.post('/soulmate/generate', async (req: Request, res: Response) => {
  try {
    const { loveDna } = req.body;
    const result = await generateSoulmate(loveDna);
    ok(res, result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : '正缘生成失败';
    fail(res, message);
  }
});

router.post('/story/event', async (req: Request, res: Response) => {
  try {
    const result = await generateStoryEvent(req.body);
    ok(res, result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : '事件生成失败';
    fail(res, message);
  }
});

router.post('/story/ending', async (req: Request, res: Response) => {
  try {
    const result = await generateEnding(req.body);
    ok(res, result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : '结局生成失败';
    fail(res, message);
  }
});

router.post('/story/replay', async (req: Request, res: Response) => {
  try {
    const result = await generateReplay(req.body);
    ok(res, result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : '回顾生成失败';
    fail(res, message);
  }
});

export default router;
