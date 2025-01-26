import { where } from "sequelize";
import DB from "../db/index.js";
const Gadget = DB.gadget;

const generateCodename = () => {
  const codenames = ["The Nightingale", "The Kraken", "Phantom", "Black Widow"];
  return codenames[Math.floor(Math.random() * codenames.length)];
};

const generateSuccessProbability = () => Math.floor(Math.random() * 101);

export const getGadget = async (req, res) => {
  try {
    const status = req.query.status;

    const gadgets = status
      ? await Gadget.findAll({ where: { status: status } })
      : await Gadget.findAll();

    const gadgetsWithProbability = gadgets.map((gadget) => {
      const successProbability = generateSuccessProbability();
      return { ...gadget.dataValues, successProbability };
    });
    res.status(200).json(gadgetsWithProbability);
  } catch (err) {
    console.log(err);

    res.status(500).json({ message: err.message });
  }
};

export const createGadget = async (req, res) => {
  try {
    const gadget = await Gadget.create({ codename: generateCodename() });
    res.status(201).json(gadget);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Gadget.update(req.body, {
      where: { gadgetId: id },
    });
    if (updated) {
      const updatedGadget = await Gadget.findOne({ where: { gadgetId: id } });
      return res.status(200).json(updatedGadget);
    }
    throw new Error("Gadget not found");
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteGadget = async (req, res) => {
  try {
    const { id } = req.params;
    const gadget = await Gadget.findOne({
      where: { gadgetId: id },
    });

    if (!gadget) {
      throw new Error("Gadget not found");
    }
    await Gadget.update(
      {
        status: "Decommissioned",
      },
      {
        where: { gadgetId: id },
      }
    );
    return res.status(200).json({ message: "Gadget decommissioned" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const selfDestructGadget = async (req, res) => {
  try {
    const gadget = await Gadget.findOne({ where: { gadgetId: req.params.id } });
    if (!gadget) {
      throw new Error("Gadget not found");
    }
    if (gadget.status === "Destroyed") {
      throw new Error("Gadget already destroyed");
    }
    const confirmationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const [updated] = await Gadget.update(
      { status: "Destroyed" },
      {
        where: { gadgetId: req.params.id },
      }
    );
    res
      .status(200)
      .json({ message: "Gadget is set to self-destruct", confirmationCode });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
